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
    // this.state = {
    //   type: 'Board',
    //   receivedId: props.id
    // };
  }
  
  componentDidMount = () => {
    console.log("componentDidMount");
    // this.props.getBoard(this.state.receivedId);
    this.props.getBoard(this.props.boardId);
  }
  
  render() {
    console.log("BoardContainer:", this.props.board)
    return (
      <Board board={this.props.board} listIds={this.props.listIds} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);


