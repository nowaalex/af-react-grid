import React from "react";
import PropTypes from "prop-types";
import { DraggableCore } from "react-draggable";

const Resizer = ({
    className,
    type,
    style,
    index,
    onDrag,
    onStart,
    disabled
}) => (
    <DraggableCore onStart={onStart} onDrag={onDrag} disabled={disabled}>
        <div
            className={className||"react-rsz-grid-default-resizer"}
            data-resizer-index={index}
            data-resizer-type={type}
            style={style}
        />
    </DraggableCore>
);

Resizer.propTypes = {
    type: PropTypes.oneOf([ "row", "col" ]),
    onDrag: PropTypes.func,
    onStart: PropTypes.func,
    index: PropTypes.number,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.object
    ]),
    baseClassName: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.object
    ])
}

export default Resizer;