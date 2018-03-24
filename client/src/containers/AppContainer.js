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
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {getAuth} from '../actions/UserActions'
import {getBoard} from '../actions/BoardActions'
import BoardContainer from './BoardContainer';
import RegisterOrLoginContainer from './RegisterOrLoginContainer';
import NavBar from '../components/NavBar';


 
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
  render() {
    const Boards = () => {
      const boardMap = this.props.user.boards.map(board => {
        return (
          <Link to={`/board/${board._id}`} key={board._id}>
            <ListItem 
              leftAvatar={<Avatar icon={<FileFolder />} />}
              primaryText={board.boardTitle}
            />
          </Link>
        );
      })
      return (
          <Paper zdepth={2}>
            <div>
              <h2>Choose a Board or Start a New One</h2>
              <List>
                {boardMap}
              </List>
            </div>
          </Paper>
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
       return this.props.user.hasAuth ? <Boards /> : <RegisterOrLogin />;
    }
    return (
      <div>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/board/:id' render={({match}) => <BoardContainer id={match.params.id} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(AppContainer);
