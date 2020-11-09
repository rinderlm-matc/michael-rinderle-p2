"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        return _super.call(this, props) || this;
    }
    Home.prototype.render = function () {
        return (React.createElement("div", { className: "row justify-content-center" },
            React.createElement("div", { className: "col-sm-8 text center" },
                React.createElement("h1", null,
                    "We do one thing, ",
                    React.createElement("strong", null, "Store Passwords"),
                    "!"),
                React.createElement("p", null, "Store and receive credentials with our on the fly secure hashed algorithm storage"),
                React.createElement(react_router_dom_1.Link, { to: "/retrieve/0" },
                    React.createElement("button", { type: "button", style: { height: "7em", marginTop: "2em;", marginBottom: "2em" }, className: "btn btn-primary btn-lg btn-block" }, "Retrieve")),
                React.createElement(react_router_dom_1.Link, { to: "/store" },
                    React.createElement("button", { type: "button", style: { height: "7em", marginTop: "2em;", marginBottom: "2em" }, className: "btn btn-secondary btn-lg btn-block" }, "Store")))));
    };
    return Home;
}(React.Component));
exports.default = react_redux_1.connect()(Home);
//# sourceMappingURL=Home.js.map