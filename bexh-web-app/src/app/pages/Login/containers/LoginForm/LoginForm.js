import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './loginActions';
import './style.scss';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
        }

        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(e) {
        e.preventDefault();
        console.log("submit login");
        this.props.login();
        this.props.history.push('/portfolio');
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <button onClick={this.submitLogin}>log in</button>
            </div>
        );
    }
}

LoginForm.propTypes = {
    login: propTypes.func.isRequired,
    loggedIn: propTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.login.item.loggedIn,
})

export default connect(mapStateToProps, { login })(LoginForm);
