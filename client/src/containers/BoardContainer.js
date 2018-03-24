import React, { Component } from 'react';
import {connect} from 'react-redux';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from '../components/Board';
import {getBoard, updateBoard, addNewList} from '../actions/BoardActions';

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps;
  const {board} = state;
  return {
    board,
    listIds: Object.keys(board.lists),
    boardId: id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoard: (id) => dispatch(getBoard(id)),
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId)),
    addNewList: (listTitle, boardId) => dispatch(addNewList(listTitle, boardId))
  }
}

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Board',
      receivedId: props.id,  
      displayedTitle: this.props.boardTitle || '',
      changingTitle: false,
      newListTitle: '',
      addingNewList: false
    };
  }
  
  componentDidMount = () => {
    console.log("componentDidMount");
    this.props.getBoard(this.state.receivedId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board.boardTitle !== this.props.board.boardTitle) {
      this.setState({displayedTitle: this.props.board.boardTitle});
    }
  }
  
  
  onChangeTextField = (e, newValue) => {
    let newState = {
      [e.target.name]: newValue
    }
    e.target.name==='displayedTitle' ? 
      newState.changingTitle = true : 
      newState.addingNewList = true;
    this.setState(newState);
  }
  saveChanges = (e) => {
    const {type, displayedTitle, newListTitle, changingTitle, addingNewList} = this.state;
    const {boardId} = this.props;
    if (changingTitle) {
      this.props.updateBoard(type, boardId, {boardTitle: displayedTitle}, boardId);
      this.setState({
        changingTitle: false,
      });
    }
    if (addingNewList) {
      this.props.addNewList(newListTitle, boardId);
      this.setState({
        addingNewCard: false,
        newListTitle: ''
      });
    }
  }
  cancelChanges = (e) => {
    this.setState({
      displayedTitle: this.props.board.boardTitle,
      newListTitle: '',
      changingTitle: false,
      addingNewList: false,
    })
  }

  render() {
    console.log("BoardContainer:", this.props.board)
    const {displayedTitle, newListTitle, changingTitle, addingNewList} = this.state;
    const {board, muiTheme, listIds} = this.props;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Board 
          board={board} 
          displayedTitle={displayedTitle}
          listIds={listIds} 
          newListTitle={newListTitle}
          onChangeTextField={this.onChangeTextField}
          changingTitle={changingTitle}
          addingNewList={addingNewList}
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
        />
      </DragDropContextProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);


