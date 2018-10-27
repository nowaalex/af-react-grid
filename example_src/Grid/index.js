import React from "react";

import Container from "Container";
import Resizer from "Resizer";

const Grid = () => (
    <Container style={{ height: "80vh" }}>
        <Container resizerChildren={<span>Hello</span>} type="col">
            <Resizer>This resizer is placed in wrong place, so it is useless</Resizer>
            <div style={{ background: "violet" }}>1</div>
            <Resizer>Yes, it can handle 2 resizers</Resizer>
            <Resizer>As if it was one</Resizer>
            <Container resizerChildren={null} style={{ minHeight: 200, flexGrow: 1 }}>
                <div style={{flexGrow: 1, background: "red" }}>2</div>
                <Resizer />
                <div style={{ background: "blue", width: 200 }}>3</div>
                <Resizer />
                <div style={{ background: "pink", padding: "1em", border: "3px solid black" }}>Paddings and borders also work</div>
                <div style={{ background: "orange" }}>No resizer goes here</div>
                <Container type="col" style={{ flexGrow: 1 }}>
                    <div style={{flexGrow: 1, background: "red" }}>5</div>
                    <Resizer />
                    <div style={{ background: "blue", overflow: "scroll", padding: "2em" }}>A little overflow with big padding</div>
                    <Resizer />
                    <div style={{ background: "pink" }}>7</div>
                </Container>
            </Container>
            <Resizer />
            <div style={{ background: "yellow", overflow: "scroll" }}>Just overflow</div>
            <Resizer>One more useless resizer</Resizer>
        </Container>
        <Resizer />
        <div style={{ background: "aqua", flexGrow: 1 }}>Hello</div>
    </Container>
    
);

export default Grid;