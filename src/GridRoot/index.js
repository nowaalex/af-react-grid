import { useRef, useEffect } from "react";
import EventEmitter from "eventemitter3";
import { RootContext } from "../contexts";
import { ByType } from "../constants";

class CellDimensions {

    Dimensions = {};
    Cells = new Map();

    Events = new EventEmitter();

    get( id ){
        return this.Dimensions[ id ];
    }

    set( id, dimension ){
        if( this.Dimensions[ id ] !== dimension ){
            this.Dimensions[ id ] = dimension;
            this.Events.emit( `@cell/${id}` );
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
            this.Events.emit( `@cell/${id}` );
        }
    }
}

const GridRoot = ({ children, fixDimensionsDelay = -1 }) => {
    const modelRef = useRef();

    if( !modelRef.current ){
        modelRef.current = new CellDimensions();
    }

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
}

export default GridRoot;