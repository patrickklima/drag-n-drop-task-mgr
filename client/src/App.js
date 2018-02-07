import React, { Component } from 'react';
import {
  NavLink, 
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <p>Hello React</p>
        </div>
      </Router>
    );
  }
}

export default App;
