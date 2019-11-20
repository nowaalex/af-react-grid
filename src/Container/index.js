
import { forwardRef } from "react";
import { TypeContext } from "../contexts";
import { css } from "@emotion/core";

const containerBaseCss = css`
    display: flex;
    flex-wrap: nowrap;
`;

const colCss = css`
    ${containerBaseCss};
    flex-direction: column;
`;

const rowCss = css`
    ${containerBaseCss};
    flex-direction: row;
`;


const Container = forwardRef(({ type, ...props }, ref ) => (
    <TypeContext.Provider value={type}>
        <div css={type==="col"?colCss:rowCss} {...props} ref={ref} />
    </TypeContext.Provider>
));

export default Container;