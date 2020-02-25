/* used as localStorage key and state default key prefix */
export var UNIQUE_HASH = "<|-aFrCtGrD-|>";
/* used in Container component to glue col and row logic together in one component */

export var ByType = {
  row: {
    cursorProp: "pageX",
    offsetDim: "offsetWidth",
    clientDim: "clientWidth",
    cssSizeProp: "width",
    minDim: "minWidth",
    maxDim: "maxWidth",
    minProps: ["Left", "Right"]
  },
  col: {
    cursorProp: "pageY",
    offsetDim: "offsetHeight",
    clientDim: "clientHeight",
    cssSizeProp: "height",
    minDim: "minHeight",
    maxDim: "maxHeight",
    minProps: ["Top", "Bottom"]
  }
};
export var ElementRefProp = "data-afgrid-id";