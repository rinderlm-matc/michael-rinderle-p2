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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var React = require("react");
var react_redux_1 = require("react-redux");
var storage_1 = require("../models/storage");
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (e) {
            var _a;
            _this.setState((_a = {}, _a[e.target.name] = e.target.value, _a));
        };
        _this.passwordCheck = function () {
            _this.setState({ isPasswordProtected: !_this.state.isPasswordProtected });
        };
        _this.confirmationCheck = function () {
            _this.setState({ confirmation: !_this.state.confirmation });
        };
        _this.store = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var storage, reqOptions;
            var _this = this;
            return __generator(this, function (_a) {
                e.preventDefault();
                if (this.state.username === "" || this.state.password === "") {
                    alert("missing username or password");
                    return [2 /*return*/, false];
                }
                if (this.state.isPasswordProtected === true) {
                    if (this.state.protectedPassword == "") {
                        alert("missing protected password");
                        return [2 /*return*/, false];
                    }
                }
                storage = new storage_1.Storage();
                storage.batch = false;
                storage.username = this.state.username;
                storage.password = this.state.password;
                storage.isPasswordProtected = this.state.isPasswordProtected;
                storage.protectedPassword = this.state.protectedPassword;
                storage.note = this.state.note;
                storage.confirmation = this.state.confirmation;
                storage.email = this.state.email;
                reqOptions = {
                    method: "post",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(storage),
                };
                fetch("data/store", reqOptions)
                    .then(function (response) { return response.json(); })
                    .then(function (data) { return _this.setState({ store: true, guid: data.guid }); })
                    .catch(function (error) { return alert(error); });
                return [2 /*return*/];
            });
        }); };
        _this.state = {
            store: false,
            guid: "",
            username: "",
            password: "",
            isPasswordProtected: false,
            protectedPassword: "",
            note: "",
            confirmation: false,
            email: "",
        };
        return _this;
    }
    Store.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "row justify-content-center" },
            React.createElement("div", { className: "col-sm-12 text-center" },
                React.createElement("h1", null, "Store Your Credential")),
            React.createElement("div", { className: "col-sm-6 " }, !this.state.store
                ?
                    React.createElement("form", null,
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Username"),
                            React.createElement("input", { type: "text", name: "username", className: "form-control", value: this.state.username, onChange: function (e) { return _this.onChange(e); } })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Password"),
                            React.createElement("input", { type: "password", name: "password", className: "form-control", value: this.state.password, onChange: function (e) { return _this.onChange(e); } })),
                        React.createElement("div", { className: "form-check" },
                            React.createElement("input", { type: "checkbox", name: "isPasswordProtected", className: "form-check-input", onChange: this.passwordCheck }),
                            React.createElement("label", { className: "form-check-label" }, "Password Protected")),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Storage Password"),
                            React.createElement("input", { type: "password", name: "protectedPassword", className: "form-control", value: this.state.protectedPassword, onChange: function (e) { return _this.onChange(e); } })),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Note"),
                            React.createElement("textarea", { name: "note", className: "form-control", value: this.state.note, onChange: function (e) { return _this.onChange(e); } })),
                        React.createElement("div", { className: "form-check" },
                            React.createElement("input", { type: "checkbox", name: "confirmation", className: "form-check-input", onChange: this.confirmationCheck }),
                            React.createElement("label", { className: "form-check-label" }, "Email Confirmation")),
                        React.createElement("div", { className: "form-group" },
                            React.createElement("label", null, "Confirmation Email"),
                            React.createElement("input", { type: "email", name: "email", className: "form-control", value: this.state.email, onChange: function (e) { return _this.onChange(e); } })),
                        React.createElement("button", { className: "btn btn-primary", onClick: function (e) { return _this.store(e); } }, "Submit"))
                :
                    React.createElement("div", null,
                        React.createElement("p", null,
                            "Your storage link is located at ",
                            React.createElement("a", { href: "/retrieve/" + this.state.guid },
                                React.createElement("button", { className: "btm btn-primary" }, "Here")))))));
    };
    return Store;
}(React.Component));
exports.default = react_redux_1.connect()(Store);
//# sourceMappingURL=Store.js.map