import React from "react";
import Container from "../Container";
import renderer from "react-test-renderer";
import mockConsole from "jest-mock-console";

test( "Empty container renders correctly", () => {

    const component = renderer.create(
        <Container />
    );

    let tree = component.toJSON();
    expect( tree ).toMatchSnapshot();
});

test( "Allows rendering of bools, undefined, null and empty strings", () => {

    const component = renderer.create(
        <Container>
            {false}
            {undefined}
            {null}
            
        </Container>
    );

    let tree = component.toJSON();
    expect( tree ).toMatchSnapshot();
});

test( "Does not allow Fragments inside Container", () => {

    const restoreConsole = mockConsole();

    renderer.create(
        <Container>
            <React.Fragment />
        </Container>
    );
    
    expect( console.error ).toHaveBeenCalled();

    restoreConsole();
});

test( "Does not allow arrays inside Container", () => {

    const restoreConsole = mockConsole();

    renderer.create(
        <Container>
            {[
                <div>1</div>
            ]}
        </Container>
    );
    
    expect( console.error ).toHaveBeenCalled();

    restoreConsole();
});

test( "React isValidElement does not accept Fragments, strings, numbers, nulls, true, false, undefined", () => {

    expect([
        React.Fragment,
        10,
        0,
        "aaa",
        "",
        null,
        true,
        false,
        undefined
    ].some( React.isValidElement )).toBeFalsy();
});