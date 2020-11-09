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
// @ts-nocheck
var React = require("react");
var react_redux_1 = require("react-redux");
var Retrieve = /** @class */ (function (_super) {
    __extends(Retrieve, _super);
    function Retrieve(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (e) {
            var _a;
            _this.setState((_a = {}, _a[e.target.name] = e.target.value, _a));
        };
        _this.getStorage = function (e) {
            if (e !== undefined)
                e.preventDefault();
            if (_this.state.guid === '')
                return;
            var reqOptions = {
                method: "get",
                headers: { "content-type": "application/json" },
            };
            fetch("data/store?guid=" + _this.state.guid, reqOptions)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                if (data.isPasswordProtected) {
                    _this.setState({
                        isLoaded: true,
                        isUnlocked: false,
                        showInfo: false,
                        guid: data.guid,
                    });
                }
                else {
                    _this.setState({
                        isLoaded: true,
                        isUnlocked: true,
                        showInfo: false,
                        guid: data.guid,
                        username: data.username,
                        password: data.password,
                        note: data.note,
                    });
                }
            })
                .catch(function (error) { return alert(error); });
        };
        _this.unlockStorage = function (e) {
            e.preventDefault();
            if (_this.state.guid === "" ||
                _this.state.submitPassword === "")
                return;
            var reqOptions = {
                method: "get",
                headers: { "content-type": "application/json" },
            };
            var query = "guid=" + _this.state.guid + "&password=" + _this.state.submitPassword;
            fetch("data/confirm?" + query, reqOptions)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                if (data !== undefined) {
                    _this.setState({
                        isLoaded: true,
                        isUnlocked: true,
                        guid: data.guid,
                        username: data.username,
                        password: data.password,
                        note: data.note,
                        submitPassword: "",
                    });
                    _this.confirmDelete();
                }
                else {
                    _this.setState({
                        isLoaded: true,
                        isUnlocked: false,
                        submitPassword: "",
                        error: "Incorrect password!",
                    });
                }
            })
                .catch(function (error) { return alert(error); });
        };
        _this.confirmDelete = function () {
            var reqOptions = {
                method: "get",
                headers: { "content-type": "application/json" },
            };
            fetch("data/delete?guid=" + _this.state.guid, reqOptions)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                if (data == false) {
                    _this.setState({
                        error: "Record wasnt deleted, contact support.",
                    });
                }
            })
                .catch(function (error) { return alert(error); });
        };
        _this.state = {
            isLoaded: false,
            isUnlocked: false,
            error: "",
            guid: _this.props.match.params.guid,
            username: "",
            password: "",
            submitPassword: "",
            isPasswordProtected: false,
            protectedPassword: "",
            note: "",
            confirmation: false,
            email: "",
        };
        if (_this.state.guid != "0") {
            _this.getStorage();
        }
        else
            _this.state.guid = '';
        return _this;
    }
    Retrieve.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "row justify-content-center" },
            React.createElement("div", { className: "col-sm-12 text-center" },
                React.createElement("h1", null, "Retrieve")),
            this.state.isLoaded
                ?
                    this.state.isUnlocked
                        ?
                            React.createElement("div", { className: "col-sm-6" },
                                React.createElement("p", null,
                                    React.createElement("strong", null, "Username : "),
                                    " ",
                                    this.state.username,
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("strong", null, "Password : "),
                                    " ",
                                    this.state.password,
                                    " ",
                                    React.createElement("br", null),
                                    React.createElement("strong", null, "Note : "),
                                    " ",
                                    this.state.note,
                                    " ",
                                    React.createElement("br", null)))
                        :
                            React.createElement("div", { className: "col-sm-6" },
                                React.createElement("p", null, "Enter Storage Password"),
                                React.createElement("form", null,
                                    React.createElement("div", { className: "form-group" },
                                        React.createElement("label", null, "Password"),
                                        React.createElement("input", { type: "password", name: "submitPassword", className: "form-control", onChange: function (e) { return _this.onChange(e); } })),
                                    React.createElement("button", { className: "btn btn-primary", onClick: function (e) { return _this.unlockStorage(e); } }, "Unlock")))
                :
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("p", null, "Enter storage guid id to fetch credentials."),
                        React.createElement("form", null,
                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", null, "Guid"),
                                React.createElement("input", { type: "text", name: "guid", className: "form-control", value: this.state.guid, onChange: function (e) { return _this.onChange(e); } })),
                            React.createElement("button", { className: "btn btn-primary", onClick: this.getStorage }, "Fetch")))));
    };
    return Retrieve;
}(React.Component));
exports.default = react_redux_1.connect()(Retrieve);
//# sourceMappingURL=Retrieve.js.map