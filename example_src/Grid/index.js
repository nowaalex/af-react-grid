import React from "react";

import Container from "Container";
import Resizer from "Resizer";

class Grid extends React.Component{

    state = {
        added: 0
    }

    add = () => this.setState( s => ({
        added: s.added + 1
    }))

    remove = () => this.setState( s => ({
        added: Math.max( s.added - 1, 0 )
    }))

    render(){

        const { added } = this.state;

        return (
            <React.Fragment>
                <div>
                    <button onClick={this.add}>Add</button>
                    <button onClick={this.remove}>Remove</button>
                </div>
                <Container localStorageKey="haha" style={{ height: "80vh" }}>
                    <Container resizerChildren={<span>Hello</span>} type="col">
                        {[
                            <Resizer key={1}>This resizer is placed in wrong place, so it is useless</Resizer>,
                            <div key={2} style={{ background: "violet" }}>1</div>,
                            <Resizer key={3}>Yes, it can handle 2 resizers</Resizer>,
                            <Resizer key={4}>As if it was one</Resizer>
                        ]}
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
                    {Array.from({ length: added }, ( el, i ) => (
                        <div key={i}>ADDED {i}</div>
                    ))}
                </Container>
            </React.Fragment>
            
        );
    }
}

export default Grid;