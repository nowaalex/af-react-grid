
import { forwardRef } from "react";
import { TypeContext } from "../contexts";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: ${props=>props.flexDirection};
    flex-wrap: nowrap;
`;

const TypesMap = {
    col: "column",
    row: "row"
};


const Container = forwardRef(({ type, ...props }, ref ) => (
    <TypeContext.Provider value={type}>
        <StyledContainer {...props} flexDirection={TypesMap[type]} ref={ref} />
    </TypeContext.Provider>
));

export default Container;