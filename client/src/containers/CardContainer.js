import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {updateBoard} from '../actions/BoardActions';
const moment = require('moment');

const mapStateToProps = (state, ownProps) => {
  const {board, board: {cards}} = state;
  const {listId, cardId} = ownProps;
  
  return {
    boardId: board._id,
    card: cards[cardId],
    listId,
    cardId
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId))
  }
}

class CardContainer extends Component {
  constructor(props) {
    super(props);
    const {listId, cardId} = props;

    this.state = {
      type: 'Card',
      listId: listId,
      _id: cardId,
      isdialogOpen: false,
      inProgressChanges: {
        title: '',
        description: '',
        membersAdded: [],
        membersRemoved: []

      }
    };
  }
  onChangeTextField = (e, newValue) => {
    console.log("onChangeTextField - target", e.target);
    this.setState({
      inProgressChanges: {
        ...this.state.inProgressChanges,
        [e.target.name]: newValue
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
    const buttons = [
      <FlatButton
        label="Save Changes"
        primary={true}
        onClick={(e) => this.okToSaveChanges(e, true)}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={(e) => this.okToSaveChanges(e, false)}
      />,
    ];
    
    const style = {
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
      }
    }; 
    
    console.log("CardContainer - card", this.props.card);
    console.log("CardContainer - cardID", this.props.cardId);
    const {cardTitle, description} = this.props.card;
    

    const cardDialog = 
      <div>
        <Dialog
          modal={false}
          actions={buttons}
          open={this.state.isdialogOpen}
          onRequestClose={this.closeDialog}
        >
        <div>
          <TextField
            defaultValue={cardTitle}
            name='cardTitle'
            inputStyle={style.cardTitle}
            underlineShow={false}
            onChange={this.onChangeTextField}
          />
        </div>
        <div>
          <TextField
            defaultValue={description}
            floatingLabelText="Description"
            name='description'
            multiLine={true}
            rows={2}
            rowsMax={6}
            underlineShow={false}
            onChange={this.onChangeTextField}
          />
        </div>
        </Dialog>
      </div>

    
    return (
      <div>
        <ListItem 
          style={style.cardTitle}
          onClick={this.openDialog}
          primaryText={cardTitle}
        />
        {this.state.isdialogOpen && cardDialog }
      </div> 
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);