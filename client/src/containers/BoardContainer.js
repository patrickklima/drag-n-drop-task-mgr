import React, { Component } from 'react';
import {connect} from 'react-redux';
import Board from '../components/Board';
import {getBoard, updateBoard} from '../actions/BoardActions';

const mapStateToProps = (state, ownProps) => {
  console.log("BoardContainer - mapStateToProps", state);
  return {
    board: state.board,
    listIds: Object.keys(state.board.lists),
    boardId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoard: (id) => dispatch(getBoard(id)),
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId))
  }
}

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Board',
      receivedId: props.id, 
      displayedTitle: this.props.boardTitle || '',
      buttonShow: false
    };
  }
  
  componentDidMount = () => {
    console.log("componentDidMount");
    // this.props.getBoard(this.state.receivedId);
    this.props.getBoard(this.props.boardId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board.boardTitle !== this.props.board.boardTitle) {
      this.setState({
        displayedTitle: this.props.board.boardTitle
      })
    }
  }
  
  
  onChangeTextField = (e, newValue) => {
    console.log("onChangeTextField - target", e.target);
    this.setState({
      displayedTitle: newValue,
      buttonShow: true
    });
  }
  saveChanges = (e) => {
    const {type, displayedTitle} = this.state;
    const {boardId} = this.props;
    console.log("saveChanges", displayedTitle)
    this.props.updateBoard(type, boardId, {boardTitle: displayedTitle}, boardId);
    this.setState({buttonShow: false})
  }
  cancelChanges = (e) => {
    this.setState({
      displayedTitle: this.props.board.boardTitle,
      buttonShow: false
    })
  }

  render() {
    console.log("BoardContainer:", this.props.board)
    return (
      <Board 
        board={this.props.board} 
        displayedTitle={this.state.displayedTitle}
        listIds={this.props.listIds} 
        onChangeTextField={this.onChangeTextField}
        buttonShow={this.state.buttonShow}
        saveChanges={this.saveChanges}
        cancelChanges={this.cancelChanges}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);


