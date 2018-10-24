import React from "react";
import PropTypes from "prop-types";
import { DraggableCore } from "react-draggable";

import { withHandlers } from "recompose";

const getHandler = propName => props => e => props[ propName ]( props.index, e );

const Resizer = ({
    className,
    type,
    style,
    onDrag,
    onStart
}) => (
    <DraggableCore onStart={onStart} onDrag={onDrag}>
        <div className={className} data-resizer-type={type} style={style}>lala</div>
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

export default withHandlers({
    onDrag: getHandler( "onDrag" ),
    onStart: getHandler( "onStart" )
})( Resizer );