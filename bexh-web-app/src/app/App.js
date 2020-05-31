import React from 'react';
import './App.scss';
import {
  Event,
  Landing,
  Sports,
  Portfolio,
} from './pages';
import { NavBar } from './components';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/event/:id" component={Event} />
        <Route exact path="/sports/:sport" render={props => <Sports key={props.match.params.sport} />} />
        <Route exact path="/portfolio" component={Portfolio} />
      </div>
    </Router>
  );
}

export default App;
