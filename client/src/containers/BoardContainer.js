import React, { Component } from 'react';
import {connect} from 'react-redux';
import Board from '../components/Board';
import {getBoard} from '../actions/BoardActions';

const mapStateToProps = (state) => {
  return {
    board: state.boardState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoard: (id) => dispatch(getBoard(id)),
  }
}

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedId: props.id
    };
  }
  
  componentDidMount = () => {
    console.log("componentDidMount");
    this.props.getBoard(this.state.receivedId);
  }
  
  render() {
    console.log("BoardContainer:", this.props.board)
    return (
      <Board board={this.props.board} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);


