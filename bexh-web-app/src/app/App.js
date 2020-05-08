import React, { Component } from 'react';
import './App.scss';
import {
  Event,
  Landing,
  Sports,
} from './pages';
import { NavBar } from './components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true
  ? <p>
    Welcome! <button onClick={() => {
      fakeAuth.signout(() => history.push('/'))
    }}>Sign Out</button>
  </p>
  : <p> You are not logged in.</p>
));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
    }} />
  )} />
);

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true,
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer === true) {
      return (
        <Redirect to={from} />
      );
    }
    else {
      return (
        <div>
          <h2>log in</h2>
          <p>you must log in to view this page at {from.pathname}</p>
          <button onClick={this.login}>log in</button>
        </div>
      )
    }
  }
}


function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={NavBar} />
        <AuthButton />
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/event" component={Event} />
        <PrivateRoute path="/sports" component={Sports} />
      </div>
    </Router>
  );
}

export default App;
