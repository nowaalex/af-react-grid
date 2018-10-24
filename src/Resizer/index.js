import { resizerClass } from "./style.module";
import { DraggableLayer } from "components/threeEventsLogic";

import { withHandlers } from "recompose";

const getHandler = propName => props => e => props[ propName ]( props.index, e );

const Resizer = ({
    className,
    baseClassName,
    type,
    onDrag,
    onDragStart
}) => (
    <DraggableLayer
        data-type={type}
        className={cn(baseClassName,className)}
        onDragStart={onDragStart}
        onDrag={onDrag}
    />
);

Resizer.propTypes = {
    type: PropTypes.oneOf([ "row", "col" ]),
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
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

Resizer.defaultProps = {
    baseClassName: resizerClass
}

export default withHandlers({
    onDrag: getHandler( "onDrag" ),
    onDragStart: getHandler( "onDragStart" )
})( Resizer );