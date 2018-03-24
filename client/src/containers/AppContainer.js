import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavLink, 
  Link,
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {getAuth} from '../actions/UserActions'
import {getBoard} from '../actions/BoardActions'
import BoardContainer from './BoardContainer';
import RegisterOrLoginContainer from './RegisterOrLoginContainer';
import NavBar from '../components/NavBar';
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
const style = {
  boardContainer: {
    height: '100%',
  }
};
class AppContainer extends Component {
  render() {
    const {user} = this.props;
    const Home = () => {
       return user.hasAuth ? <AllBoards user={user}/> : <RegisterOrLoginContainer />;
    }
    return (
      <Paper zdepth={2} style={style.boardContainer}>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/board/:id' render={({match}) => <BoardContainer id={match.params.id} />} />
          </Switch>
        </Router>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(AppContainer);
