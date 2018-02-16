import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from '../components/List';
import {updateBoard} from '../actions/BoardActions';


const mapStateToProps = (state, ownProps) => {
  return {
    boardId: state.board._id,
    list: state.board.lists[ownProps.listId]
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId))
  }
}


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'List',
      listId: props.listId,
      isFetching: false,
      error: null
    };
  }
   
  
  render() {
    console.log("ListContainer", this.props.list);
    return (
      <div>
        <List
          list={this.props.list}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
