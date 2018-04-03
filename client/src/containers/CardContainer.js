import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DragSource} from 'react-dnd';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {updateBoard, moveCardToNewList} from '../actions/BoardActions';
import Card from '../components/Card';
const moment = require('moment');

const mapStateToProps = (state, ownProps) => {
  const {board, user, board: {cards}} = state;
  const {listId, cardId} = ownProps;
  
  return {
    boardId: board._id,
    username: user.username,
    list: board.lists[listId],
    card: cards[cardId],
    listId,
    cardId
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (type, id, data, boardId) => 
      dispatch(updateBoard(type, id, data, boardId)),
    moveCardToNewList: (movingCardId, fromListId, toListId, boardId) => 
      dispatch(moveCardToNewList(movingCardId, fromListId, toListId, boardId)),
  }
}
//React Drag n Drop: Defining Card's dragging states
const cardSource = {
  beginDrag: (props) => ({id: props.cardId}),
  endDrag: (props, monitor) => {
    const {moveCardToNewList, cardId, listId, boardId} = props;
    const cardDropTarget = monitor.getDropResult();
    if (cardDropTarget) { // cardDropTarget would be null if drag was cancelled
      moveCardToNewList(cardId, listId, cardDropTarget.listId, boardId);
    }
  },
}
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

class CardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Card',
      isdialogOpen: false,
      inProgressChanges: {
      }
    };
  }
  onChangeTextField = (e, newValue) => {
    this.setState({
      inProgressChanges: {
        ...this.state.inProgressChanges,
        [e.target.name]: newValue, 
      }
    });
  }
  toggleCompleted = () => {
    const {isCompleted} = this.props.card;
    this.setState({
      inProgressChanges: {
        ...this.state.inProgressChanges,
        isCompleted: !isCompleted
      }
    }); 
  }
  okToSaveChanges = (e, okToSave) => {
    const {type, inProgressChanges} = this.state;
    const {_id, changes} = this.props.card;
    const boardId = this.props.boardId;
    let newState = {};
    if (okToSave) {
      newState = {
        ...this.state,
        ...inProgressChanges
      };
      inProgressChanges.date = moment();
      inProgressChanges.username = this.props.username;
      newState.changes = [
        ...changes,
        inProgressChanges
      ]
      console.log("CardContainer", newState);
      this.props.updateBoard(type, _id, newState, boardId);
    } 
    newState.inProgressChanges = {};
    this.setState(newState);
    this.closeDialog();
  }
  openDialog = (e) => {
    console.log(e);
    this.setState({isdialogOpen: true});
  }
  closeDialog = (e) => {
    this.setState({isdialogOpen: false});
  }
  
  render() {
    const {connectDragSource, muiTheme} = this.props;
    const {cardTitle, description, isCompleted, changes} = this.props.card;
    const {listTitle} = this.props.list;
    console.log("CardContainer - cardID", this.props.cardId);
    console.log("CardContainer - card", this.props.card);
    
    return connectDragSource(
      <div id={cardTitle}>
        <Card 
          muiTheme={muiTheme}
          cardTitle={cardTitle}
          cardId={this.props.cardId}
          description={description}
          listTitle={listTitle}
          isCompleted={isCompleted}
          toggleCompleted={this.toggleCompleted}
          isdialogOpen={this.state.isdialogOpen}
          openDialog={this.openDialog}
          closeDialog={this.closeDialog}
          onChangeTextField={this.onChangeTextField}
          okToSaveChanges={this.okToSaveChanges}
          changes={changes}
        />
      </div>
    );
  };
}

CardContainer = muiThemeable()(CardContainer);
CardContainer = DragSource('Card', cardSource, collect)(CardContainer);
export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);