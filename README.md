# af-react-grid
Resizable and customizable flexbox grid for React.
[Usage example](https://nowaalex.github.io/af-react-grid/example_dist)

![Demo image](https://i.postimg.cc/8z2tj91T/aaa.gif)

## Code example: 
```javascript
/* Include these 2 css files somewhere in your index.js */
import "af-react-grid/dist/style.css";

/* If you want custom resizer style - do not import this file */
import "af-react-grid/dist/resizer.style.css";

import { Container, Resizer } from "af-react-grid";

<Containter localStorageKey="someGridName" type="row">
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

resizerClassName: ?string = "react-rsz-grid-default-resizer",

localStorageKey: ?string

```

## Resizer props
```javascript
className: ?string,

style: ?object,

children: ?node

disabled: ?bool

```

## Features
* Very small, exported as es modules (own code 3.5kb + react + react-dom + react-draggable + classNames)
* Resizers are also given `data-resizer-index` and `data-resizer-type`, so their styling could be customized easily;
* `resizerChildren` and `resizerClassName` props are passed deep to all nested `Container`s, so you want to declare these props only on root `Container`. Of course they may be overriden anywhere;
* `maxHeight`, `minHeight`, `maxWidth`, `minWidth` are considered even if not declared inline, because their values are taken from `getComputedStyle` before drag starts;
* Want to have a super-highly customized `Resizer`? `resizerChildren` prop allows you to render custom child elements, which could be easily styled;
* `localStorageKey` prop is passed down to children with child index added, like `someGridName_0_2`, until overriden;
* If a child has `key` prop, it's dimensions are saved by key, otherwise by it's index, so be careful to use unique keys;


## Tooltips
* If tou want `overflow: auto` on containers, you must either set it globally( add overflow rule to default container class ), or individually;
* `React.Fragment` children are not yet supported;
* `Resizer`, which is first or last child, does nothing( see example );
* Feel free to customize `Resizer` styling by providing your own css( use `dist/resizer.style.css` as an example )

## TODO
* Support `React.Fragment` children.
* Add types
* `findDomNode` refuse ( maybe? )
