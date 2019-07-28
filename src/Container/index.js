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


const Container = ({ children, type, ...props }) => (
    <TypeContext.Provider value={type}>
        <StyledContainer {...props} flexDirection={TypesMap[type]}>
            {children}
        </StyledContainer>
    </TypeContext.Provider>
);

export default Container;