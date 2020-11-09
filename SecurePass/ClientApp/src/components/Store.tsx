// @ts-nocheck
import * as React from "react";
import { connect } from "react-redux";
import { Storage } from "../models/storage";

class Store extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
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
    }

    public onChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    public passwordCheck = () => {
        this.setState({ isPasswordProtected: !this.state.isPasswordProtected });
    }

    public confirmationCheck = () => {
        this.setState({ confirmation: !this.state.confirmation });
    }

    public store = async (e: any) => {
        e.preventDefault();

        if (this.state.username === "" || this.state.password === "") {
            alert("missing username or password");
            return false;
        }

        if (this.state.isPasswordProtected === true) {
            if (this.state.protectedPassword == "") {
                alert("missing protected password");
                return false;
            }
        }

        const storage = new Storage();
        storage.batch = false;
        storage.username = this.state.username;
        storage.password = this.state.password;
        storage.isPasswordProtected = this.state.isPasswordProtected;
        storage.protectedPassword = this.state.protectedPassword;
        storage.note = this.state.note;
        storage.confirmation = this.state.confirmation;
        storage.email = this.state.email;

        const reqOptions = {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(storage),
        };

        fetch("data/store", reqOptions)
            .then((response) => response.json())
            .then((data) => this.setState({ store: true, guid: data.guid }))
            .catch((error) => alert(error));
    }

    public render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 text-center">
                    <h1>Store Your Credential</h1>
                </div>
                <div className="col-sm-6 ">
                    {
                        !this.state.store
                        ?
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={(e) => this.onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={(e) => this.onChange(e)} />
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        name="isPasswordProtected"
                                        className="form-check-input"
                                        onChange={this.passwordCheck} />
                                    <label className="form-check-label">Password Protected</label>
                                </div>
                                <div className="form-group">
                                    <label>Storage Password</label>
                                    <input
                                        type="password"
                                        name="protectedPassword"
                                        className="form-control"
                                        value={this.state.protectedPassword}
                                        onChange={(e) => this.onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label>Note</label>
                                    <textarea
                                        name="note"
                                        className="form-control"
                                        value={this.state.note}
                                        onChange={(e) => this.onChange(e)} />
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        name="confirmation"
                                        className="form-check-input"
                                        onChange={this.confirmationCheck} />
                                    <label className="form-check-label">Email Confirmation</label>
                                </div>
                                <div className="form-group">
                                    <label>Confirmation Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(e) => this.onChange(e)} />
                                </div>

                                <button className="btn btn-primary" onClick={(e) => this.store(e)}>Submit</button>
                            </form>
                        :
                            <div>
                                <p>Your storage link is located at <a href={`/retrieve/${this.state.guid}`}><button className="btm btn-primary" >Here</button></a></p>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect()(Store);
