import * as React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <div className="fluid-container">
        <NavMenu/>
        <Container>
            {props.children}
            </Container>
        </div>
    </React.Fragment>
);
