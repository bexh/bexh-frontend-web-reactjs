import React from 'react';
import './App.scss';
import { Event } from './pages';
import { NavBar } from './components';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Event />
    </div>
  );
}

export default App;
