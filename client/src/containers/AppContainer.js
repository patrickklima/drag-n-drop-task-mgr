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
import RegisterOrLoginContainer from './RegisterOrLoginContainer';



const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
    // getAuth: () => dispatch(getAuth())
  }
};
class AppContainer extends Component {
  render() {
    const Boards = () => {
      return (
          <BoardContainer id={'5a8db69a89648e046f03751d'}/>
      );
    }

    
    const RegisterOrLogin = () => {
      return (
        <Paper zdepth={2}>
          <div>
            <RegisterOrLoginContainer />
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
