"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Home_1 = require("./components/Home");
var Layout_1 = require("./components/Layout");
var Retrieve_1 = require("./components/Retrieve");
var Store_1 = require("./components/Store");
require("./custom.css");
exports.default = (function () { return (React.createElement(Layout_1.default, null,
    React.createElement(react_router_1.Route, { exact: true, path: "/", component: Home_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: "/retrieve/:guid", component: Retrieve_1.default }),
    React.createElement(react_router_1.Route, { exact: true, path: "/store", component: Store_1.default }))); });
//# sourceMappingURL=App.js.map