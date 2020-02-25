
import React, { forwardRef } from "react";
import { TypeContext } from "../contexts";
import { css, cx } from "emotion";

const containerBaseCss = css`
    display: flex;
    flex-wrap: nowrap;
`;

const colCss = cx(containerBaseCss, css`flex-direction: column;`);

const rowCss = cx(containerBaseCss, css`flex-direction: row;`);


const Container = forwardRef(({ type, Component = "div", className, ...props }, ref ) => (
    <TypeContext.Provider value={type}>
        <Component className={cx(type==="col"?colCss:rowCss,className)} {...props} ref={ref} />
    </TypeContext.Provider>
));

export default Container;