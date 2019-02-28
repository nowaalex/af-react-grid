import React from "react";
import ReactDOM from "react-dom";

import Grid from "./Grid";

const App = () => (
    <div>
        <h1>Example grid</h1>
        <p>
            <a target="_blank" href="https://github.com/nowaalex/af-react-grid/tree/master/example_src">Source code of this example</a>
        </p>
        <Grid />
    </div>
)

const r = document.createElement( "div" );
document.body.appendChild( r );

ReactDOM.render( <App />, r )