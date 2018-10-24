import React from "react";

import Container from "Container";
import Resizer from "Resizer";

class Grid extends React.Component{
    render(){
        return (
            <div>
                <Container type="col" style={{ height: "60vh" }}>
                    <div style={{ background: "violet" }}>1</div>
                    <Resizer />
                    <Container type="row" style={{ flexGrow: 1 }}>
                        <div style={{flexGrow: 1, background: "red" }}>2</div>
                        <Resizer />
                        <div style={{ background: "blue" }}>3</div>
                        <Resizer />
                        <div style={{ background: "pink" }}>4</div>
                        <div>5</div>
                    </Container>
                    <Resizer />
                    <div style={{ background: "yellow" }}>6</div>
                </Container>
            </div>
        )
    }
}

export default Grid;