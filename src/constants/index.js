import { css } from "emotion";

/* used as localStorage key and state default key prefix */
export const UNIQUE_HASH = "<|-aFrCtGrD-|>";

export const DEFAULT_RESIZER_STYLES = {
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 7,
    position: "relative",
    background: "#fff",
    zIndex: 10,

    '&[data-resizer-type="row"]': {
        cursor: "col-resize"
    },
    
    '&[data-resizer-type="col"]': {
        cursor: "row-resize"
    }
}

const rowClassName = css`
    display: flex;
    flex-flow: row nowrap;
`;

const colClassName = css`
    display: flex;
    flex-flow: column nowrap;
`;


/* used in Container component to glue col and row logic together in one component */
export const ByType = {
    row: {
        colClassName: rowClassName,
        cursorPropName: "pageX",
        offsetDim: "offsetWidth",
        clientDim: "clientWidth",
        cssSizeProp: "width",
        minDim: "minWidth",
        maxDim: "maxWidth",
        minProps: [ "Left", "Right" ]
    },
    col: {
        colClassName: colClassName,
        cursorPropName: "pageY",
        offsetDim: "offsetHeight",
        clientDim: "clientHeight",
        cssSizeProp: "height",
        minDim: "minHeight",
        maxDim: "maxHeight",
        minProps: [ "Top", "Bottom" ]
    }
};