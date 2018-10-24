import {
    flexColumnNowrap,
    flexRowNowrap
} from "flexclasses.module";

export const ByType = {
    row: {
        className: flexRowNowrap,
        ptr: "pageX",
        dim: "clientWidth",
        prop: "width",
        min: "minWidth",
        max: "maxWidth"
    },
    col: {
        className: flexColumnNowrap,
        ptr: "pageY",
        dim: "clientHeight",
        prop: "height",
        min: "minHeight",
        max: "maxHeight"
    }
}