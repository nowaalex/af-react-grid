# af-react-grid
Resizable flexbox grid for React.

[Usage example](https://nowaalex.github.io/af-react-grid/example_dist)

## Code example: 
```javascript
/* Include these 2 css files somewhere in your index.js */
import "af-react-grid/dist/style.css";

/* If you want custom resizer style - do not import this file */
import "af-react-grid/dist/resizer.style.css";

import { Container, Resizer } from "af-react-grid";

<Containter type="row">
    <div>Child 1</div>
    <Resizer />
    <div>Child 2</div>
    <Resizer>
    <Containter type="row">
        <div>Subchild 1</div>
        <Resizer />
        <div>Subchild 2</div>
    </Container>
</Container>
```

## Container props
```javascript
type: ?( "row" | "col" ) = "row",

className: ?string,

style: ?object,

children: ?node,

/* Next 2 props are passed down as default props to Resizer and Container children*/

resizerChildren: ?node,

resizerClassName: ?string = "react-rsz-grid-default-resizer"

```

## Resizer props
```javascript
className: ?string,

style: ?object,

children: ?node

```
Resizers are also given data-resizer-index and data-resizer-type, so their styling could be customized easily.

##Tooltips
* If tou want overflow: auto on containers, you must either set it globally( add overflow rule to default container class ), or individually.