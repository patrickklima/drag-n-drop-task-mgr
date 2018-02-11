import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
const moment = require('moment');

class CardContainer extends Component {
  constructor(props) {
    super(props);
    const {card} = props;

    this.state = {
      _id: card._id,
      cardTitle: card.cardTitle,
      description: card.description,
      members: card.members,
      changes: card.changes,
      dialogOpen: false,
      inProgressChanges: {
        title: '',
        description: '',
        membersAdded: [],
        membersRemoved: []

      }
    };
  }
  onChangeTextField = (e, newValue) => {
    this.setState({
      inProgressChanges: {
        ...this.state.inProgressChanges,
        [e.target.name]: newValue
      }
    });
  }
  okToSaveChanges = (e, okToSave) => {
    const {inProgressChanges, changes} = this.state;
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
    }
    newState.inProgressChanges = {};
    this.setState(newState);
    this.closeDialog();
  }
  openDialog = (e) => {
    this.setState({dialogOpen: true});
  }
  closeDialog = (e) => {
    this.setState({dialogOpen: false});
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
    
    const cardDialog = 
      <div>
        <Dialog
          modal={false}
          actions={buttons}
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog}
        >
        <div>
          <TextField
            defaultValue={this.state.cardTitle}
            name='cardTitle'
            inputStyle={style.cardTitle}
            underlineShow={false}
            onChange={this.onChangeTextField}
          />
        </div>
        <div>
          <TextField
            defaultValue={this.state.description}
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
          primaryText={this.state.cardTitle}
        />
        {this.state.dialogOpen && cardDialog }
      </div> 
    );
  };
}

export default CardContainer;