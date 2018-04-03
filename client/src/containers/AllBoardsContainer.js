import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import SaveCancelButtons from '../components/SaveCancelButtons';
import {addNewBoard} from '../actions/UserActions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewBoard: (boardTitle, userId) => dispatch(addNewBoard(boardTitle, userId)), 
  };
};
class AllBoards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoardTitle: '',
      addingNewBoard: false,
    };
  }
  onChangeTextField = (e, newValue) => {
    newValue === '' 
      ? this.setState({
          newBoardTitle: '',
          addingNewBoard: false
        })
      : this.setState({
          newBoardTitle: newValue,
          addingNewBoard: true
        });
  }
  saveChanges = () => {
    this.props.addNewBoard(this.state.newBoardTitle, this.props.user._id);
  }
  cancelChanges = () => {
    this.setState({
      newBoardTitle: '',
      addingNewBoard: false,
    });
  }

  render() {
    const {newBoardTitle, addingNewBoard} = this.state;
    const {user} = this.props;
    const style = {
      newBoardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }; 
    const boardMap = user.boards.map(board => {
      return (
        <Link key={board._id} to={`/board/${board._id}`} >{'  '} 
          <ListItem 
            leftAvatar={<Avatar icon={<FileFolder />} />}
            primaryText={board.boardTitle}
          />
        </Link>
      );
    });
    const nameANewBoard = 
    <div key='new board'>
      <TextField
        value={newBoardTitle}
        hintText='Name a new board...'
        name='newBoardTitle'
        inputStyle={style.newBoardTitle}
        underlineShow={false}
        onChange={this.onChangeTextField}
      />
      {addingNewBoard && 
        <SaveCancelButtons 
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
        />}
      </div>;

    return (
      <div>
        <h2>Choose a Board or Start a New One</h2>
        <List>
          {boardMap}
          <ListItem 
            
            leftAvatar={<Avatar icon={<ActionNoteAdd />} />}
            children={nameANewBoard}
          />
        </List>
      </div>
    );
  }
};

AllBoards = connect(mapStateToProps, mapDispatchToProps)(AllBoards);
export default AllBoards;