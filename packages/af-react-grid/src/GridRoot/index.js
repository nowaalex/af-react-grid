import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import EventEmitter from "eventemitter3";
import { RootContext } from "../contexts";
import { ByType } from "../constants";

class CellDimensions extends EventEmitter {

    Dimensions = Object.create( null );

    Cells = new Map();

    get( id ){
        return this.Dimensions[ id ];
    }

    set( id, dimension ){
        if( this.Dimensions[ id ] !== dimension ){
            this.Dimensions[ id ] = dimension;
            this.emit( `@cell/${id}` );
        }
    }

    registerCell( id, type, ref ){
        this.Cells.set( id, { type, ref });
    }

    unregisterCell( id ){
        this.Cells.delete( id );
    }

    fixDimensions(){
        for( let [ id, { type, ref }] of this.Cells ){
            const { offsetDim } = ByType[ type ];
            this.Dimensions[ id ] = ref.current[ offsetDim ];
        }

        for( let [ id ] of this.Cells ){
            this.emit( `@cell/${id}` );
        }
    }
}

const GridRoot = forwardRef(({ children, fixDimensionsDelay = -1 }, ref ) => {
    const modelRef = useRef();

    if( !modelRef.current ){
        modelRef.current = new CellDimensions();
    }

    useImperativeHandle( ref, () => modelRef.current, []); 

    useEffect(() => {
        if( fixDimensionsDelay >= 0 ){
            const timer = setTimeout(() => {
                modelRef.current.fixDimensions();
            }, fixDimensionsDelay );

            return () => {
                clearTimeout( timer );
            }
        }
    }, [ fixDimensionsDelay ])

    return (
        <RootContext.Provider value={modelRef.current}>
            {children}
        </RootContext.Provider>
    );
});

export default GridRoot;