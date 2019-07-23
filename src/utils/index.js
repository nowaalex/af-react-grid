import { findDOMNode } from "react-dom";

export const memoizeOneNumericArg = ( fn, cache = Object.create( null ) ) => arg => cache[ arg ] || ( cache[ arg ] = fn( arg ) );

export const clamp = ( num, min, max ) => num > max ? max : num < min ? min : num;

export const getCorrectProperty = ( obj, prop, fallbackProp ) => obj.hasOwnProperty( prop ) ? obj[ prop ] : fallbackProp;

export const getNodeFromRef = ref => {
    if( !ref ){
        return null;
    }

    const { current } = ref;

    return current instanceof Element ? current : findDOMNode( current );
}