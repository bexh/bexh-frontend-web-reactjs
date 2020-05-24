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
        <Route path="/event" component={Event} />
        <Route path="/sports/:sport" component={Sports} />
        <Route path="/portfolio" component={Portfolio} />
      </div>
    </Router>
  );
}

export default App;
