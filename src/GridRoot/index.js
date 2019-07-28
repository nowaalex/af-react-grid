import { useRef } from "react";
import EventEmitter from "eventemitter3";
import { RootContext } from "../contexts";

class CellDimensions {

    Dimensions = {};

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
}

const GridRoot = ({ children }) => {
    const modelRef = useRef();

    if( !modelRef.current ){
        modelRef.current = new CellDimensions();
    }

    return (
        <RootContext.Provider value={modelRef.current}>
            {children}
        </RootContext.Provider>
    )
}

export default GridRoot;