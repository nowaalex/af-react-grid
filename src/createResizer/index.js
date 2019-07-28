import { useContext, useRef, memo, useCallback } from "react";
import { RootContext, TypeContext } from "../contexts";
import { DraggableCore } from "react-draggable";
import clamp from "lodash/clamp";
import { ByType, ElementRefProp } from "../constants";

const getCurMaxMin = ( element, containerType ) => {

    const { maxDim, minDim, offsetDim, clientDim, minProps } = ByType[ containerType ];

    const obj = getComputedStyle( element );

    const offsetDimValue = element[ offsetDim ];

    /*
        padding, border and scrollbar ignore width: 0 or height: 0. So we must add them to minProp.
        padding + border will ignore scrollbar dimensions, so calculting this way: offset - client + padding
    */
    const minDist = offsetDimValue - element[ clientDim ] + minProps.reduce(( sum, propName ) => sum + parseFloat( obj[ `padding${propName}` ] ), 0 );

    return [
        offsetDimValue,
        minDist + ( parseFloat( obj[ minDim ] ) || 0 ),
        parseFloat( obj[ maxDim ] ) || 0
    ];
}

const setResizeLimits = ( targetObj, el1, el2, containerType ) => {
    let [ cur1, min1, max1 ] = getCurMaxMin( el1, containerType );
    let [ cur2, min2, max2 ] = getCurMaxMin( el2, containerType );

    const sum = cur1 + cur2;
    
    if( !max1 ){
        max1 = sum - min2; 
    }

    if( !max2 ){
        max2 = sum - min1;
    }

    Object.assign( targetObj, { cur1, cur2, min1, min2, max1, max2 });
}

const setExactSiblingsDimensions = ( GridModel, sibling, offsetDimensionProp ) => {
    for( let child of sibling.parentNode.children ){
        if( child.hasAttribute( ElementRefProp ) ){
            GridModel.set( child.getAttribute( ElementRefProp ), child[offsetDimensionProp] );
        }
    }
}

const createResizer = Component => memo(({ disabled }) => {

    const MutableStore = useRef({}).current;

    const GridModel = useContext( RootContext );
    const containerType = useContext( TypeContext );

    const dragStartHandler = useCallback(( e, { node }) => {
        const nextNode = node.previousElementSibling;
        const prevNode = node.nextElementSibling;

        if( nextNode && prevNode ){
            const { offsetDim, cursorProp } = ByType[ containerType ];
            const id1 = MutableStore.id1 = prevNode.getAttribute( ElementRefProp );
            const id2 = MutableStore.id2 = nextNode.getAttribute( ElementRefProp );
            if( id1 && id2 ){
                MutableStore.startOffset = e[ cursorProp ];
                setExactSiblingsDimensions( GridModel, node, offsetDim );
                setResizeLimits( MutableStore, prevNode, nextNode, containerType );
            }
            else{
                throw new Error( `All child elements must render ${ElementRefProp} property` );
            }
        }
    }, []);

    const dragHandler = useCallback( e => {
        const { id1, id2, cur1, cur2, startOffset, min1, min2, max1, max2 } = MutableStore;
        const { cursorProp } = ByType[ containerType ];
        const delta = e[ cursorProp ] - startOffset;
        GridModel.set( id1, clamp( cur1 - delta, min1, max1 ) );
        GridModel.set( id2, clamp( cur2 + delta, min2, max2 ) );
    }, [ containerType ]);

    return (
        <DraggableCore onStart={dragStartHandler} onDrag={dragHandler} disabled={disabled}>
            <Component type={containerType} disabled={disabled} />
        </DraggableCore>
    );
})

export default createResizer;