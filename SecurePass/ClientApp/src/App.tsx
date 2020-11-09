import * as React from "react";
import { Route } from "react-router";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Retrieve from "./components/Retrieve";

import Store from "./components/Store";
import "./custom.css";

export default () => (
    <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/retrieve/:guid" component={Retrieve} />
        <Route exact path="/store" component={Store} />
    </Layout>
);
