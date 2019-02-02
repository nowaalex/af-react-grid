import React from "react";
import renderer from "react-test-renderer";
import Resizer from "./Resizer";
import Container from "./Container";

test( "Container passes correct className to Resizer", () => {
    
    const component = renderer.create(
        <Container resizerClassName="class1">
            <Resizer className="class2" />
        </Container>
    );

    expect( component.root.findByProps({
        className: "class2"
    }));

    component.update(
        <Container resizerClassName="class3">
            <Resizer />
        </Container>
    );

    expect( component.root.findByProps({
        className: "class3"
    }));

    component.update(
        <Container resizerClassName={undefined}>
            <Resizer className="class4" />
        </Container>
    );

    expect( component.root.findAll( el => el.type === "div" && el.props.className === "class4" )).toHaveLength( 1 );

    component.update(
        <Container resizerClassName="class5">
            <Resizer />
            <Container>
                <Resizer />
                <Container>
                    <Resizer />
                </Container>
            </Container>
        </Container>
    );

    expect( component.root.findAll( el => el.type === "div" && el.props.className === "class5" )).toHaveLength( 3 );

    /* Now trying to stop inheritance.... */

    component.update(
        <Container resizerClassName="class6">
            <Resizer />
            <Container>
                <Resizer />
                <Container resizerClassName={undefined}>
                    <Resizer />
                </Container>
            </Container>
        </Container>
    );

    expect( component.root.findAll( el => el.type === "div" && el.props.className === "class6" )).toHaveLength( 2 );

    /* Now trying to pass two classes... */

    component.update(
        <Container resizerClassName="class7">
            <Resizer />
            <Container>
                <Resizer />
                <Container resizerClassName="class8">
                    <Resizer />
                    <Container>
                        <Resizer />
                    </Container>
                </Container>
            </Container>
        </Container>
    );

    expect( component.root.findAll( el => el.type === "div" && el.props.className === "class7" )).toHaveLength( 2 );

    expect( component.root.findAll( el => el.type === "div" && el.props.className === "class8" )).toHaveLength( 2 );
});


test( "Container passes correct children to Resizer", () => {
    
    const component = renderer.create(
        <Container resizerChildren={<pre />}>
            <Resizer />
            <Container>
                <Resizer />
                <Container resizerChildren={<abbr />}>
                    <Resizer />
                    <Resizer />
                    <Resizer />
                    <Container>
                        <Resizer>
                            Other child
                        </Resizer>
                    </Container>
                </Container>
            </Container>
        </Container>
    );

    expect( component.root.findAllByType( "pre" ) ).toHaveLength( 2 );
    expect( component.root.findAllByType( "abbr" ) ).toHaveLength( 3 );
});