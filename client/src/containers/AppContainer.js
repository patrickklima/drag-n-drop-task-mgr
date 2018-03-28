import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavLink, 
  Link,
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {getAuth} from '../actions/UserActions'
import {getBoard} from '../actions/BoardActions'
import BoardContainer from './BoardContainer';
import RegisterOrLoginContainer from './RegisterOrLoginContainer';
import NavBarContainer from './NavBarContainer';
import AllBoards from '../components/AllBoards';


 
const mapStateToProps = (state) => {
  return {
    user: state.user, 
    board: state.board
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
  }
};

class AppContainer extends Component {
  style = {
    AppContainer: {
      height: '100%',
    }, 
    BoardsAndLogin: {
      padding: this.props.muiTheme.spacing.desktopGutter,
      height: '100%',
    }
  }
  render() {
    const {user} = this.props;
    const Home = () => {
       return user.hasAuth ? <AllBoards user={user}/> : <RegisterOrLoginContainer />;
    }
    return (
      <Paper zdepth={2} style={this.style.AppContainer}>
        <Router>
          <div>
            <NavBarContainer />
            <Paper style={this.style.BoardsAndLogin}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/board/:id' render={({match}) => <BoardContainer id={match.params.id} />} />
              </Switch>
            </Paper>
          </div>
        </Router>
      </Paper>
    );
  }
}

AppContainer = muiThemeable()(AppContainer);
AppContainer = connect(mapStateToProps, mapDisptachToProps)(AppContainer);
export default AppContainer;
