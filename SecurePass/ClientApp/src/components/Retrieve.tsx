// @ts-nocheck
import * as React from "react";
import { connect } from "react-redux";

class Retrieve extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            isLoaded: false,
            isUnlocked: false,
            error: "",
            guid: this.props.match.params.guid,
            username: "",
            password: "",
            submitPassword: "",
            isPasswordProtected: false,
            protectedPassword: "",
            note: "",
            confirmation: false,
            email: "",
        };
        if (this.state.guid != "0") {
            this.getStorage();
        }
        else
            this.state.guid = '';
    }

    public onChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    public getStorage = (e?: any) => {
        if(e !== undefined)
            e.preventDefault();
        if (this.state.guid === '') return;
        const reqOptions = {
            method: "get",
            headers: { "content-type": "application/json" },
        };
        fetch(`data/store?guid=${this.state.guid}`, reqOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.isPasswordProtected) {
                    this.setState(
                        {
                            isLoaded: true,
                            isUnlocked: false,
                            showInfo: false,
                            guid: data.guid,
                        });
                } else {
                    this.setState(
                        {
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
            .catch((error) => alert(error));
    }

    public unlockStorage = (e: any) => {
        e.preventDefault();

        if (this.state.guid === "" ||
            this.state.submitPassword === "") return; 

        const reqOptions = {
            method: "get",
            headers: { "content-type": "application/json" },
        };
        const query = `guid=${this.state.guid}&password=${this.state.submitPassword}`;
        fetch("data/confirm?" + query,
            reqOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data !== undefined) {
                    this.setState(
                        {
                            isLoaded: true,
                            isUnlocked : true,
                            guid: data.guid,
                            username: data.username,
                            password: data.password,
                            note: data.note,
                            submitPassword: "",
                        });
                    this.confirmDelete();
                } else {
                    this.setState(
                        {
                            isLoaded: true,
                            isUnlocked: false,
                            submitPassword: "",
                            error: "Incorrect password!",
                        });
                }
            })
            .catch((error) => alert(error));
    }

    public confirmDelete = () => {
        const reqOptions = {
            method: "get",
            headers: { "content-type": "application/json" },
        };
        fetch(`data/delete?guid=${this.state.guid}`, reqOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data == false) {
                    this.setState(
                        {
                            error: "Record wasnt deleted, contact support.",
                        });
                }
            })
            .catch((error) => alert(error));
    }

    public render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 text-center">
                    <h1>Retrieve</h1>
                </div>
                {
                    this.state.isLoaded
                        ?
                        this.state.isUnlocked
                            ?
                            <div className="col-sm-6">
                                <p>
                                    <strong>Username : </strong> {this.state.username} <br />
                                    <strong>Password : </strong> {this.state.password} <br />
                                    <strong>Note : </strong> {this.state.note} <br />
                                </p>
                            </div>
                            :
                            <div className="col-sm-6">
                                <p>Enter Storage Password</p>
                                <form>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="submitPassword"
                                            className="form-control"
                                            onChange={e => this.onChange(e)} />
                                    </div>
                                    <button className="btn btn-primary" onClick={e => this.unlockStorage(e)}>Unlock</button>
                                </form>
                            </div>
                        :
                        <div className="col-sm-6">
                            <p>Enter storage guid id to fetch credentials.</p>
                            <form>
                                <div className="form-group">
                                    <label>Guid</label>
                                    <input
                                        type="text"
                                        name="guid"
                                        className="form-control"
                                        value={this.state.guid}
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <button className="btn btn-primary" onClick={this.getStorage}>Fetch</button>
                            </form>
                        </div>
                }
            </div>
        );
    }
}

export default connect()(Retrieve);
