import React from "react";

import Container from "Container";
import Resizer from "Resizer";

const Grid = () => (
    <Container resizerChildren={<span>Hello</span>} type="col" style={{ height: "60vh" }}>
        <div style={{ background: "violet" }}>1</div>
        <Resizer />
        <Container resizerChildren={null} type="row" style={{ minHeight: 200, flexGrow: 1 }}>
            <div style={{flexGrow: 1, background: "red" }}>2</div>
            <Resizer />
            <div style={{ background: "blue", width: 200 }}>3</div>
            <Resizer />
            <div style={{ background: "pink" }}>4</div>
            <Resizer />
            <Container type="col" style={{ flexGrow: 1 }}>
                <div style={{flexGrow: 1, background: "red" }}>5</div>
                <Resizer />
                <div style={{ background: "blue" }}>6</div>
                <Resizer />
                <div style={{ background: "pink" }}>7</div>
            </Container>
        </Container>
        <Resizer />
        <div style={{ background: "yellow" }}>8</div>
    </Container>
);

export default Grid;