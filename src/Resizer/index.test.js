import React from "react";
import renderer from "react-test-renderer";
import Resizer from "../Resizer";

test( "Resizer component renders correctly", () => {
    const component = renderer.create(
        <Resizer />
    );

    let tree = component.toJSON();

    expect( tree ).toMatchSnapshot();
});