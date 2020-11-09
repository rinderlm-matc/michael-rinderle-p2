import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
    }

    public render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-8 text center">
                    <h1>We do one thing, <strong>Store Passwords</strong>!</h1>
                    <p>Store and receive credentials with our on the fly secure hashed algorithm storage</p>
                    <Link to="/retrieve/0">
                        <button type="button"
                            style={{ height: "7em", marginTop: "2em;", marginBottom: "2em" }}
                            className="btn btn-primary btn-lg btn-block">Retrieve</button>
                    </Link>
                    <Link to="/store">
                        <button
                            type="button"
                            style={{ height: "7em", marginTop: "2em;", marginBottom: "2em" }}
                            className="btn btn-secondary btn-lg btn-block">Store</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default connect()(Home);