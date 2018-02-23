import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from '../components/List';
import {updateBoard, addNewCard} from '../actions/BoardActions';


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
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId)),
    addNewCard: (newCardTitle, listId, boardId) => dispatch(addNewCard(newCardTitle, listId, boardId)),
  }
}


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'List',
      displayedTitle: this.props.list.listTitle,
      changingTitle: false,
      newCardTitle: '',
      addingNewCard: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.list.listTitle !== this.props.list.listTitle) {
      this.setState({displayedTitle: this.props.list.listTitle});
    }
  }
  onChangeTextField = (e, newValue) => {
    let newState = {
      [e.target.name]: newValue,
    }
    e.target.name==='displayedTitle' ? 
      newState.changingTitle = true : 
      newState.addingNewCard = true;
    this.setState(newState);
  }
  saveChanges = (e) => {
    const {type, displayedTitle, newCardTitle, changingTitle, addingNewCard} = this.state;
    const {listId, boardId} = this.props;
    if (changingTitle) {
      this.props.updateBoard(type, listId, {listTitle: displayedTitle}, boardId); 
      this.setState({
        changingTitle: false,
      });
    }
    if (addingNewCard) {
      this.props.addNewCard(newCardTitle, listId, boardId);
      this.setState({
        addingNewCard: false,
        newCardTitle: ''
      });
    }
  }
  cancelChanges = (e) => {
    this.setState({
      displayedTitle: this.props.list.listTitle,
      newCardTitle: '',
      changingTitle: false,
      addingNewCard: false,
    })
  }
  
  render() {
    console.log("ListContainer", this.state);
    return (
      <div>
        <List
          list={this.props.list}
          displayedTitle={this.state.displayedTitle}
          newCardTitle={this.state.newCardTitle}
          onChangeTextField={this.onChangeTextField}
          changingTitle={this.state.changingTitle}
          addingNewCard={this.state.addingNewCard}
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
