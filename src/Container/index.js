import React, { createRef, isValidElement, Children, useReducer, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import StateSaver from "./StateSaver";
import { css, cx } from "emotion";

import { memoizeOneNumericArg, clamp, getCorrectProperty, getNodeFromRef } from "../utils";
import { ByType, UNIQUE_HASH } from "../constants";

function childrenMapper( el ){

    if( !isValidElement( el ) ){
        return el;
    }

    const { type, props, key } = el;

    const { type: curType, localStorageKey } = this.props;

    const curIndex = this._refsArrIterator;

    if( type.isResizer ){
        return React.cloneElement( el, {
            index: curIndex,
            onDrag: this.dragHandler,
            onStart: this.dragStartHandler,
            type: curType
        });
    }

    /*
        UNIQUE_HASH is needed here for keys not to collide. For example:
        <Container>
            <div>
                This element does not have default key.
                So without UNIQUE_HASH it would be keyed just by index. Key would be: 0.
                People often use indexes as keys, so we try to decrease collision chance.
            </div>
            {[
                [ 0, 1, 2 ].map( i => <div key={i}>{i}</div> )
            ]}
        </Container>
    */
    const stateKey = key || ( UNIQUE_HASH + curIndex );

    this._indexesToKeys[ curIndex ] = stateKey;

    const calculatedElementStyle = this.state[ stateKey ];

    const passProps = {
        style: props.style ? { ...props.style, ...calculatedElementStyle } : calculatedElementStyle,
        ref: this._getSaveRef( curIndex )
    }

    if( type === Container ){
        /* We sacrifice performance in order to make code more compact here */
        passProps.localStorageKey = getCorrectProperty( props, "localStorageKey", localStorageKey + "_" + stateKey );
    }

    this._refsArrIterator++;

    return React.cloneElement( el, passProps );
}

class Container extends React.Component{

    static propTypes = {
        type:                   PropTypes.oneOf([ "row", "col" ]),
        className:              PropTypes.string,
        style:                  PropTypes.object,
        children: ( props, propName ) => {
            const arr = Children.toArray( props[ propName ] );
            if( arr.some( child => React.isValidElement( child ) && ( child.type === React.Fragment ) ) ){
                throw new Error( "Fragments are not allowed inside Container, use arrays instead" );
            }
        },
        localStorageKey:        PropTypes.string
    }

    static defaultProps = {
        type: "row"
    }

    constructor( props ){
        super( props );

        this.state = StateSaver.getStylesInfo( props.localStorageKey );
    }


    /*  
        Inner props:

        _refsArrIterator;
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

    /*
        If we want to save child dimensions by it's key, not index,
        we need to have a chance to get this key by index while resizing;
    */
    _indexesToKeys = {};

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

    sendToStateSaverIfNeeded(){
        const { localStorageKey } = this.props;
        if( localStorageKey ){
            StateSaver.addStylesInfo( localStorageKey, this.state );
        }
    }

    dragStartHandler = e => {

        /* If a child would be rendered inside Resizer, event target would not have data-resizer-index attr */
        const index = this._curRszIndex = +e.currentTarget.dataset.resizerIndex;
        
        const prevElement = getNodeFromRef( this.refsArr[ index - 1 ] );
        const nextElement = getNodeFromRef( this.refsArr[ index ] );

        if( prevElement && nextElement ){
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

            this.setExactDimensions();
        }
        else if( process.env.NODE_ENV !== "production" ){
            console.warn( "Resizer must be between other components. It is inactive during this drag." );
        }
    }

    _getChangedState( curState, cssSizeProp, step ){

        const index = this._curRszIndex;
        const realCurIndex = this._indexesToKeys[ index ];
        const realPrevIndex = this._indexesToKeys[ index - 1 ];

        return {
            [ realPrevIndex ]: {
                ...curState[ realPrevIndex ],
                [cssSizeProp]: clamp( this._curD1 + step, this._minD1, this._maxD1 )
            },
            [ realCurIndex ]: {
                ...curState[ realCurIndex ],
                [cssSizeProp]: clamp( this._curD2 - step, this._minD2, this._maxD2 )
            }
        };
    }

    dragHandler = e => {

        const index = this._curRszIndex;

        /* It is better to always check children here, because they could be unmounted while dragging */
        if( getNodeFromRef( this.refsArr[ index ] ) && getNodeFromRef( this.refsArr[ index - 1 ] ) ){

            const { cursorPropName, cssSizeProp } = ByType[ this.props.type ];
            const step = e[ cursorPropName ] - this._initPtrPageDist;
    
            this.setState( curState => this._getChangedState(
                curState,
                cssSizeProp,
                step
            ));
        }
    }

    _getSaveRef = memoizeOneNumericArg( index => this.refsArr[ index ] = createRef());

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
                className={cx(className,ByType[type].colClassName)}
                children={Children.map( children, childrenMapper, this )}
            />
        )
    }

    _dimensionsStateModifier = ( curState, { type } ) => {
        
        const { cssSizeProp, offsetDim } = ByType[ type ];

        return this.refsArr.reduce(( res, ref, i ) => {
            /*
                ReactDOM.findDomNode may be null for some Container children
            */

            const stateKey = this._indexesToKeys[ i ];

            const node = getNodeFromRef( ref );

            if( node ){
                res[ stateKey ] = {
                    ...curState[ stateKey ],
                    [cssSizeProp]: node[ offsetDim ],
    
                    /* If exact width/height is known, flexBasis may be erased */
                    flexBasis: "auto",
    
                    /* We must take boxSizing into account to render borders, paddings, scrollbars, etc. */
                    boxSizing: "border-box"
                };
            }
            return res;
        }, {});
    }

    setExactDimensions = () => this.setState( this._dimensionsStateModifier );

    componentDidMount(){
        this._st = setTimeout( this.setExactDimensions, 50 );
        window.addEventListener( "resize", this.setExactDimensions );
    }

    componentDidUpdate(){

        this.sendToStateSaverIfNeeded();

        const diff = this.refsArr.length - this._refsArrIterator;

        if( diff ){
            /*
                If children quantity decreased, refsArr must be shortened.
                splice is faster than slice ( jsperf ), so using it.
            */
            this.refsArr.splice( this._refsArrIterator, diff );
        }
    }

    componentWillUnmount(){
        window.removeEventListener( "resize", this.setExactDimensions );
        clearTimeout( this._st );
    }
}

export default Container;