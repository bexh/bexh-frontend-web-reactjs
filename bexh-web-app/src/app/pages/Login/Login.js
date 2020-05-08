import React from 'react';
import './style.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        }
    }


    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <button onClick={this.props.login}>log in</button>
            </div>
        );
    }
}
