import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListHeader from '../components/ListHeader';
import ListBody from '../components/ListBody';
import ListAddNewCard from '../components/ListAddNewCard';
import {updateBoard, addNewCard} from '../actions/BoardActions';
import ReactDOM from 'react-dom';
import Dragula from 'react-dragula';
import styles from 'dragula/dist/dragula.css';


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
    // let container = React.findDOMNode(this);
    // Dragula([container]);
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
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      let drake = Dragula([componentBackingInstance], options);
    }
  }
  render() {
    console.log("ListContainer", this.state);
    const {displayedTitle, newCardTitle, changingTitle, addingNewCard} = this.state;
    const {dragulaDecorator, onChangeTextField, saveChanges, cancelChanges} = this;
    const {list} = this.props;
    return (
      <div >
        <ListHeader 
          displayedTitle={displayedTitle}
          onChangeTextField={onChangeTextField}
          changingTitle={changingTitle}
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
        />
        <ListBody 
          dragulaDecorator={dragulaDecorator}
          list={list}
          displayedTitle={displayedTitle}
          newCardTitle={newCardTitle}
          onChangeTextField={onChangeTextField}
          changingTitle={changingTitle}
          addingNewCard={addingNewCard}
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
        />
        <ListAddNewCard 
          newCardTitle={newCardTitle}
          onChangeTextField={onChangeTextField}
          addingNewCard={addingNewCard}
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
        />
       
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);



// <List 
// dragulaDecorator={this.dragulaDecorator }
// list={this.props.list}
// displayedTitle={this.state.displayedTitle}
// newCardTitle={this.state.newCardTitle}
// onChangeTextField={this.onChangeTextField}
// changingTitle={this.state.changingTitle}
// addingNewCard={this.state.addingNewCard}
// saveChanges={this.saveChanges}
// cancelChanges={this.cancelChanges}
// />

