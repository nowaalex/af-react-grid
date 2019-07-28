import React from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Container, Cell, GridRoot, createResizer } from "index.js";

const Child = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const baseResizerClass = css`
    flex: 0 0 1px;
    position: relative;
    background: green;
    z-index: 1;

    &:after {
        position: absolute;
        content: "";
    }
`;

const colResizer = css`
    cursor: row-resize;
    &:after {
        height: 11px;
        left: 0;
        right: 0;
        top: -5px;
    }
`;

const rowResizer = css`
    cursor: col-resize;
    &:after {
        width: 11px;
        top: 0;
        bottom: 0;
        left: -5px;
    }
`;


const Resizer = createResizer(({ type, ...props }) => (
    <div {...props} css={css`
        ${baseResizerClass}
        ${type==="col" ? colResizer : rowResizer}
    `} />
));

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
            <GridRoot>
                <Container type="row" css={css`height: 70vh; width:80vw;`}>
                    <Cell>
                        <Child>1</Child>
                    </Cell>
                    <Resizer />
                    <Cell>
                        <Child>2</Child>
                    </Cell>
                    <Resizer />
                    <Cell>
                        <Container type="col" css={css`width:20vw;`}>
                            <Cell>
                                <Child>1</Child>
                            </Cell>
                            <Resizer />
                            <Cell>
                                <Child>2</Child>
                            </Cell>
                            <Resizer />
                            <Cell>
                                <Child>7</Child>
                            </Cell>
                            <Resizer />
                            <Cell>
                                <Child>9</Child>
                            </Cell>
                        </Container>
                    </Cell>
                    <Resizer />
                    <Cell>
                        <Child>9</Child>
                    </Cell>
                </Container>
            </GridRoot>
        );
    }
}

export default Grid;