import React, { Component } from 'react';
// import {
//   NavLink, 
//   BrowserRouter as Router, 
//   Switch, 
//   Route
// } from 'react-router-dom';
// import App from '../components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BoardContainer from './BoardContainer';

const App = () =>  {
  console.log("Inside the App");
  return (
    <MuiThemeProvider>
      <BoardContainer id={'5a7a572d638fed00a56629f9'}/>
    </MuiThemeProvider>
  );
};


class AppContainer extends Component {

  render() {
    return (
      // <Router>
      <App />
      // </Router>
    );
  }
}

export default AppContainer;
