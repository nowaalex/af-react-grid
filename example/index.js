import React from "react";
import ReactDOM from "react-dom";

import "style.css";

import Grid from "./Grid";


const r = document.createElement( "div" );
document.body.appendChild( r );

const App = () => <div><Grid /></div>

ReactDOM.render( <App />, r )