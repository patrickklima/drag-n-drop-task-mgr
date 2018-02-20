import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavLink, 
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {getAuth} from '../actions/UserActions'
import BoardContainer from './BoardContainer';
import RegistrationContainer from './RegistrationContainer';
import LoginContainer from './LoginContainer';



const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
    getAuth: () => dispatch(getAuth())
  }
};
class AppContainer extends Component {
  render() {
    const Boards = () => {
      return (
          <BoardContainer id={'5a7a572d638fed00a56629f9'}/>
      );
    }

    
    const RegisterOrLogin = () => {
      return (
        <Paper zdepth={2}>
          <div>
            <RegistrationContainer />
            <LoginContainer />
          </div>
        </Paper>
      );
    }
    
    const Home = () => {
      // this.props.getAuth();
       return this.props.user.hasAuth ? <Boards /> : <RegisterOrLogin />;
    }
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />

            
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(AppContainer);
