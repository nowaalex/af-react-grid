import React from "react";
import PropTypes from "prop-types";
import { DraggableCore } from "react-draggable";

export const Resizer = React.memo(({
    className,
    type,
    style,
    index,
    onDrag,
    onStart,
    disabled,
    children
}) => (
    <DraggableCore onStart={onStart} onDrag={onDrag} disabled={disabled}>
        <div
            data-resizer-index={index}
            data-resizer-type={type}
            className={className}
            style={style}
            children={children}
        />
    </DraggableCore>
));

Resizer.propTypes = {
    type: PropTypes.oneOf([ "row", "col" ]),
    onDrag: PropTypes.func,
    onStart: PropTypes.func,
    index: PropTypes.number,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string
}

export default Resizer;