import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import Resizer from "../Resizer";

const ByType = {
    row: {
        className: "react-rsz-grid-row",
        ptr: "pageX",
        dim: "clientWidth",
        prop: "width",
        min: "minWidth",
        max: "maxWidth"
    },
    col: {
        className: "react-rsz-grid-col",
        ptr: "pageY",
        dim: "clientHeight",
        prop: "height",
        min: "minHeight",
        max: "maxHeight"
    }
}

const memoizeOneNumericArg = ( fn, cache = {} ) => arg => cache[ arg ] || ( cache[ arg ] = fn( arg ) );

const clamp = ( num, min, max ) => num > max ? max : num < min ? min : num;

const throttle = ( callback, limit ) => {

    let wait = false;
    let timer;

    const cancelWait = () => wait = false;

    const clearTimer = () => clearTimeout( timer );

    const invoke = () => {

        if ( wait )
            return;

        callback.apply( null, arguments );
        wait = true;

        clearTimer();

        timer = setTimeout( cancelWait, limit );
    }

    invoke.cancel = clearTimer;

    return invoke;
}

class Container extends React.Component{

    static propTypes = {
        type:                   PropTypes.oneOf([ "row", "col" ]).isRequired,
        className:              PropTypes.string,
        resizerClassName:       PropTypes.string,
        children:               PropTypes.node,
    }

    state = {}

    /* Initial dimensions caches, used to calculate sizes onDrag */

    /*
        _curRszIndex;
        _initPtrPageDist;
        _curD1;
        _curD2;
        _minD1;
        _maxD1;
        _minD2;
        _maxD2;
    */

    refsArr = [];

    _setInitialDimensionsCache( elIndex, fieldIndex ){

        const el = this.refsArr[ elIndex ];

        const { max, min, dim } = ByType[ this.props.type ];

        const obj = getComputedStyle( el );

        this[ "_curD" + fieldIndex ] = el[ dim ];
        this[ "_minD" + fieldIndex ] = parseInt( obj[ min ], 10 ) || 0;
        this[ "_maxD" + fieldIndex ] = parseInt( obj[ max ], 10 ) || 0;
    }

    onStart = e => {

        if( process.env.NODE_ENV === "development" ){
            console.log( "onStart", e );
        }

        const index = this._curRszIndex = +e.target.getAttribute( "data-resizer-index" );

        const { ptr } = ByType[ this.props.type ];

        this._initPtrPageDist = e[ ptr ];

        this._setInitialDimensionsCache( index - 1, 1 );
        this._setInitialDimensionsCache( index + 1, 2 );

        const sum = this._curD1 + this._curD2;

        if( !this._maxD1 ){
            this._maxD1 = sum - this._minD2; 
        }

        if( !this._maxD2 ){
            this._maxD2 = sum - this._minD1;
        }
    }

    _getChangedState( curState, prop, step ){
        const index = this._curRszIndex;
        return {
            [ index - 1 ]: {
                ...curState[ index - 1 ],
                [prop]: clamp( this._curD1 + step, this._minD1, this._maxD1 )
            },
            [ index + 1 ]: {
                ...curState[ index + 1 ],
                [prop]: clamp( this._curD2 - step, this._minD2, this._maxD2 )
            }
        };
    }

    onDrag = e => {

        if( process.env.NODE_ENV === "development" ){
            console.log( "onDrag", e );
        }

        const { ptr, prop } = ByType[ this.props.type ];
        const step = e[ ptr ] - this._initPtrPageDist;

        this.setState( curState => this._getChangedState(
            curState,
            prop,
            step
        ));
    }

    _getSaveRef = memoizeOneNumericArg( index => node => {
        this.refsArr[ index ] = node ? ReactDOM.findDOMNode( node ) : null;
    })

    childrenMapper = ( el, index ) => {

        if( !el ){
            return el;
        }

        const { type, props } = el;

        if( type === React.Fragment ){
            throw new Error( "Fragments are not supported in ResizableFlexGrid right now." );
        }

        return React.cloneElement( el, type === Resizer ? {
            index,
            onDrag: this.onDrag,
            onStart: this.onStart,
            type: this.props.type,
        } : {
            style: props.style ? {
                ...props.style,
                ...this.state[ index ]
            } : this.state[ index ],
            ref: this._getSaveRef( index )
        })
    }

    render(){

        const {
            type,
            className,
            children,
            style
        } = this.props;

        return (
            <div
                style={style}
                className={cn(className,ByType[type].className)}
                children={React.Children.map( children, this.childrenMapper )}
            />
        )
    }

    _dimensionsStateModifier = ( curState, { type } ) => {
        
        const { prop, dim } = ByType[ type ];

        return this.refsArr.reduce(( acc, ref, i ) => {
            if( ref ){
                acc[ i ] = {
                    ...curState[ i ],
                    [prop]: ref[ dim ]
                }
            }
            return acc;
        }, {});
    }

    setExactDimensions = throttle(() => this.setState( this._dimensionsStateModifier ), 150);

    componentDidMount(){
        this.setExactDimensions();
        window.addEventListener( "resize", this.setExactDimensions );
    }

    componentDidUpdate({ children: prevChildren }){

        const { children } = this.props;

        const prevChildrenLen = React.Children.count( prevChildren );
        const curChildrenLen =  React.Children.count( children );

        if( prevChildrenLen !== curChildrenLen ){
            if( prevChildrenLen > curChildrenLen ){
                this.refsArr.splice( curChildrenLen );
            }
            this.setExactDimensions();
        }
    }

    componentWillUnmount(){
        window.removeEventListener( "resize", this.setExactDimensions );
        this.setExactDimensions.cancel();
    }
}

export default Container;