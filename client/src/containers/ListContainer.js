import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from '../components/List';
import {updateBoard} from '../actions/BoardActions';


const mapStateToProps = (state, ownProps) => {
  const {listId} = ownProps;
  const {_id, lists} = state.board;
  return {
    list: lists[listId],
    boardId: _id,
    listId
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
      displayedTitle: this.props.list.listTitle,
      buttonShow: false
    };
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
    const {listId, boardId} = this.props;
    this.props.updateBoard(type, listId, {listTitle: displayedTitle}, boardId);
    this.setState({buttonShow: false})
  }
  cancelChanges = (e) => {
    this.setState({
      displayedTitle: this.props.list.listTitle,
      buttonShow: false
    })
  }
  
  render() {
    console.log("ListContainer", this.state);
    return (
      <div>
        <List
          list={this.props.list}
          displayedTitle={this.state.displayedTitle}
          onChangeTextField={this.onChangeTextField}
          buttonShow={this.state.buttonShow}
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
