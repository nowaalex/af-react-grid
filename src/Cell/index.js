import {
    cloneElement,
    useContext,
    useRef,
    useEffect,
    useMemo,
    useState,
    isValidElement
} from "react";

import { RootContext, TypeContext } from "../contexts";
import { ByType, ElementRefProp } from "../constants";

const ADDITIONAL_INLINE_STYLES = {
    /* If exact width/height is known, flexBasis may be erased */
    flexBasis: "auto",
    
    /* We must take boxSizing into account to render borders, paddings, scrollbars, etc. */
    boxSizing: "border-box"
}

export const useDefaultCellKey = () => {
    const keyRef = useRef();
    if( !keyRef.current ){
        keyRef.current = Math.random().toString(36).slice(-7);
    }
    return keyRef.current;
}

export const useCellStyle = cellKey => {
    const GridModel = useContext( RootContext );
    const type = useContext( TypeContext );
    const [ curDimension, setCurDimension ] = useState( GridModel.get( cellKey ) );

    useEffect(() => {
        const up = () => setCurDimension( GridModel.get( cellKey ) );
        const evt = `@cell/${cellKey}`;
        GridModel.Events.on( evt, up );
        return () => {
            GridModel.Events.off( evt, up );
        }
    }, [ cellKey ]);

    return useMemo(() => curDimension !== undefined ? ({
        ...ADDITIONAL_INLINE_STYLES,
        [ByType[type].cssSizeProp]: curDimension
    }) : undefined, [ type, curDimension ]);
}

export const Cell = ({ children: SingleChild, cellKey }) => {

    if( !isValidElement( SingleChild ) ){
        throw new Error( "Cell must have one child" );
    }

    const { style: providedStyle } = SingleChild.props;

    const defaultCellKey = useDefaultCellKey();
    const finalCellKey = cellKey || defaultCellKey;
    const cellStyle = useCellStyle( finalCellKey, providedStyle );

    const style = useMemo(() => {
        if( !providedStyle ){
            return cellStyle;
        }

        return cellStyle && {
            ...providedStyle,
            ...cellStyle
        }
    }, [ cellStyle, providedStyle ]);

    return cloneElement( SingleChild, { [ElementRefProp]: finalCellKey, style });
}