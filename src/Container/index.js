import React, { Children } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import Resizer from "../Resizer";

import { memoizeOneNumericArg, clamp } from "../utils";

const ByType = {
    row: {
        colClassName: "react-rsz-grid-row",
        cursorPropName: "pageX",
        offsetDim: "offsetWidth",
        clientDim: "clientWidth",
        cssSizeProp: "width",
        minDim: "minWidth",
        maxDim: "maxWidth",
        minProps: [ "Left", "Right" ]
    },
    col: {
        colClassName: "react-rsz-grid-col",
        cursorPropName: "pageY",
        offsetDim: "offsetHeight",
        clientDim: "clientHeight",
        cssSizeProp: "height",
        minDim: "minHeight",
        maxDim: "maxHeight",
        minProps: [ "Top", "Bottom" ]
    }
}

function childrenMapper( el ){

    if( !React.isValidElement( el ) ){
        return el;
    }

    const { type, props } = el;

    const { resizerClassName, resizerChildren, type: curType } = this.props;

    if( type === Resizer ){
        return React.cloneElement( el, {
            index: this._refsArrIterator,
            onDrag: this.dragHandler,
            onStart: this.dragStartHandler,
            type: curType,
            className: props.className || resizerClassName
        }, props.children || resizerChildren );
    }

    const calculatedElementStyle = this.state[ this._refsArrIterator ];

    const passProps = {
        style: props.style ? { ...props.style, ...calculatedElementStyle } : calculatedElementStyle,
        ref: this._getSaveRef( this._refsArrIterator++ )
    }

    if( type === Container ){
        if( props.resizerClassName === undefined ){
            passProps.resizerClassName = resizerClassName;
        }
        if( props.resizerChildren === undefined ){
            passProps.resizerChildren = resizerChildren;
        }
    }

    return React.cloneElement( el, passProps );
}

class Container extends React.PureComponent{

    static propTypes = {
        type:                   PropTypes.oneOf([ "row", "col" ]),
        className:              PropTypes.string,
        style:                  PropTypes.object,
        children: ( props, propName ) => {
            const arr = Children.toArray( props[ propName ] );
            if( arr.some( child => React.isValidElement( child ) && ( child.type === React.Fragment || Array.isArray( child ) ) ) ){
                throw new Error( "Fragments and arrays are not allowed inside Container" );
            }
        },
        resizerChildren:        PropTypes.node,
        resizerClassName:       PropTypes.string
    }

    static defaultProps = {
        type: "row",
        resizerClassName: "react-rsz-grid-default-resizer"
    }

    state = {}

    /*  
        Inner props:

        _refsArrIterator;
        _canDrag;
        _curRszIndex;
        _initPtrPageDist;
        _curD1;
        _curD2;
        _minD1;
        _maxD1;
        _minD2;
        _maxD2;
    */

    /*
        Possible refsArr elements:
            * simple elements( div, span, etc. )
            * other Containers
            * components, that treat style property and render single child
    */
    refsArr = [];

    _setInitialDimensionsCache( el, fieldIndex ){

        const { type } = this.props;
        const { maxDim, minDim, offsetDim, clientDim, minProps } = ByType[ type ];

        const obj = getComputedStyle( el );

        const d = this[ "_curD" + fieldIndex ] = el[ offsetDim ];

        /*
            padding, border and scrollbar ignore width: 0 or height: 0. So we must add them to minProp.
            padding + border will ignore scrollbar dimensions, so calculting this way: offset - client + padding
        */
        const minDist = d - el[ clientDim ] + minProps.reduce(( sum, propName ) => sum + parseFloat( obj[ `padding${propName}` ] ), 0 );

        this[ "_minD" + fieldIndex ] = minDist + ( parseFloat( obj[ minDim ] ) || 0 );
        this[ "_maxD" + fieldIndex ] = parseFloat( obj[ maxDim ] ) || 0;
    }

    dragStartHandler = e => {

        /* If a child would be rendered inside Resizer, event target would not have data-resizer-index attr */
        const index = this._curRszIndex = +e.currentTarget.dataset.resizerIndex;
        
        const prevElement = this.refsArr[ index - 1 ];
        const nextElement = this.refsArr[ index ];

        if( this._canDrag = !!( prevElement && nextElement ) ){
            /* Can drag only if resizer is not first or last child inside refsArr */

            const { cursorPropName } = ByType[ this.props.type ];

            this._initPtrPageDist = e[ cursorPropName ];
    
            this._setInitialDimensionsCache( prevElement, 1 );
            this._setInitialDimensionsCache( nextElement, 2 );
    
            const sum = this._curD1 + this._curD2;
    
            if( !this._maxD1 ){
                this._maxD1 = sum - this._minD2; 
            }
    
            if( !this._maxD2 ){
                this._maxD2 = sum - this._minD1;
            }

            this.setExactDimensions()
        }
        else if( process.env.NODE_ENV !== "production" ){
            console.warn( "Resizer must be between other components. It is inactive during this drag." );
        }
    }

    _getChangedState( curState, cssSizeProp, step ){
        const index = this._curRszIndex;
        return {
            [ index - 1 ]: {
                ...curState[ index - 1 ],
                [cssSizeProp]: clamp( this._curD1 + step, this._minD1, this._maxD1 )
            },
            [ index ]: {
                ...curState[ index ],
                [cssSizeProp]: clamp( this._curD2 - step, this._minD2, this._maxD2 )
            }
        };
    }

    dragHandler = e => {
        if( this._canDrag ){

            const { cursorPropName, cssSizeProp } = ByType[ this.props.type ];
            const step = e[ cursorPropName ] - this._initPtrPageDist;
    
            this.setState( curState => this._getChangedState(
                curState,
                cssSizeProp,
                step
            ));
        }
    }

    _getSaveRef = memoizeOneNumericArg( index => node => {
        this.refsArr[ index ] = ReactDOM.findDOMNode( node );
    })

    

    render(){

        const {
            type,
            className,
            children,
            style
        } = this.props;

        /* this iterator is used and incremented in childrenMapper to fill refsArr selectively. */
        this._refsArrIterator = 0;

        return (
            <div
                style={style}
                className={cn(className,ByType[type].colClassName)}
                children={Children.map( children, childrenMapper, this )}
            />
        )
    }

    _dimensionsStateModifier = ( curState, { type } ) => {
        
        const { cssSizeProp, offsetDim } = ByType[ type ];

        return this.refsArr.reduce(( res, ref, i ) => {
            res[ i ] = {
                ...curState[ i ],
                [cssSizeProp]: ref[ offsetDim ],

                /* If exact width/height is known, flexBasis may be erased */
                flexBasis: "auto",

                /* We must take boxSizing into account to render borders, paddings, scrollbars, etc. */
                boxSizing: "border-box"
            };
            return res;
        }, {});
    }

    setExactDimensions = () => this.setState( this._dimensionsStateModifier );

    componentDidMount(){
        this._st = setTimeout( this.setExactDimensions, 50 );
        window.addEventListener( "resize", this.setExactDimensions );
    }

    componentDidUpdate(){
        
        const diff = this.refsArr.length - this._refsArrIterator;

        if( diff ){
            this.refsArr.splice( this._refsArrIterator, diff );
        }
    }

    componentWillUnmount(){
        window.removeEventListener( "resize", this.setExactDimensions );
        clearTimeout( this._st );
    }
}

export default Container;