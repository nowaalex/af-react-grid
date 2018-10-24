import ReactDOM from "react-dom";
//import Resizer from "../Resizer";

import {
    ByType
} from "./utils";

import _ from "lodash";

class Container extends React.PureComponent{

    static propTypes = {
        onResizerDrag:          PropTypes.func,
        onResizerDragStart:     PropTypes.func,
        type:                   PropTypes.oneOf([ "row", "col" ]),
        children:               PropTypes.node,

        /* Use it, if you want to use custom Resizer or wrap default with some HOC */
        ResizerElement:         PropTypes.oneOfType([ PropTypes.func, PropTypes.object ])
    }

    static defaultProps = {
        type: "row",
       // ResizerElement: Resizer
    }

    state = {}

    /* Initial dimensions caches, used to calculate sizes onDrag */
    _initPtrPageDist;
    _curD1;
    _curD2;
    _minD1;
    _maxD1;
    _minD2;
    _maxD2;

    refsArr = [];

    _setInitialDimensionsCache( elIndex, fieldIndex ){

        const el = this.refsArr[ elIndex ];

        const { max, min, dim } = ByType[ this.props.type ];
        
        const obj = getComputedStyle( el );

        this[ "_curD" + fieldIndex ] = el[ dim ];

        const minVal = parseInt( obj[ min ], 10 );
        this[ "_minD" + fieldIndex ] = isNaN( minVal ) ? 0 : minVal;

        const maxVal = parseInt( obj[ max ], 10 );
        this[ "_maxD" + fieldIndex ] = isNaN( maxVal ) ? null : maxVal;
    }

    onDragStart = ( index, e ) => {
        const { ptr } = ByType[ this.props.type ];

        this._initPtrPageDist = e[ ptr ];

        this._setInitialDimensionsCache( index - 1, 1 );
        this._setInitialDimensionsCache( index + 1, 2 );

        const sum = this._curD1 + this._curD2;

        if( this._maxD1 === null ){
            this._maxD1 = sum - this._minD2; 
        }

        if( this._maxD2 === null ){
            this._maxD2 = sum - this._minD1;
        }
    }

    _getChangedState( curState, prop, index, step ){
        return ({
            [ index - 1 ]: {
                ...curState[ index - 1 ],
                [prop]: _.clamp(
                    this._curD1 + step,
                    this._minD1,
                    this._maxD1
                )
            },
            [ index + 1 ]: {
                ...curState[ index + 1 ],
                [prop]: _.clamp(
                    this._curD2 - step,
                    this._minD2,
                    this._maxD2
                )
            }
        })
    }

    onDrag = ( index, e ) => {

        const { ptr, prop } = ByType[ this.props.type ];
        const step = e[ ptr ] - this._initPtrPageDist;

        this.setState( curState => this._getChangedState(
            curState,
            prop,
            index,
            step
        ));
    }

    /* by default only first arg is used as memoization key */
    _getSaveRef = _.memoize( index => node => {
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

        return React.cloneElement( el, type === this.props.ResizerElement ? {
            index,
            onDrag: this.onDrag,
            onDragStart: this.onDragStart,
            type: this.props.type,
            ref: this._getSaveRef( index )
        } : {
            ResizerElement: type === Container ? this.props.ResizerElement : undefined,
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
                className={cn(ByType[ type ].className,className)}
                children={React.Children.map( children, this.childrenMapper )}
            />
        )
    }

    _dimensionsStateModifier = curState => {
        
        const { prop, dim } = ByType[ this.props.type ];

        let resultState = {};

        for( let i = this.refsArr.length, ref; i--; ){
            ref = this.refsArr[ i ];
            if( ref ){
                resultState[ i ] = {
                    ...curState[ i ],
                    [prop]: ref[ dim ]
                }
            }
        }

        return resultState;
    }

    setExactDimensions = _.throttle(() => this.setState( this._dimensionsStateModifier ), 150, {
        leading: false
    });

    componentDidMount(){
        this.setExactDimensions();
        window.addEventListener( "resize", this.setExactDimensions );
    }

    componentDidUpdate({
        children: prevChildren,
        height: prevHeight,
        width: prevWidth
    }){

        const {
            children, 
            height,
            width
        } = this.props;

        const prevChildrenLen = React.Children.count( prevChildren );
        const curChildrenLen =  React.Children.count( children );

        if(
            width !== prevWidth ||
            height !== prevHeight ||
            prevChildrenLen !== curChildrenLen
        ){
            if( prevChildrenLen > curChildrenLen ){
                this.refsArr.splice( curChildrenLen );
            }
            this.setExactDimensions();
        }
    }

    componentWillUnmount(){
        this.setExactDimensions.cancel();
        window.removeEventListener( "resize", this.setExactDimensions );
    }
}

export default Container;