import React from 'react';
import {ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';

export default ({
  cardTitle, 
  description, 
  listTitle,
  isCompleted,
  toggleCompleted,
  isdialogOpen, 
  openDialog, 
  closeDialog,
  onChangeTextField, 
  okToSaveChanges, 
}) => {
  const buttons = [
    <FlatButton
      label="Save Changes"
      primary={true}
      onClick={(e) => okToSaveChanges(e, true)}
    />,
    <FlatButton
      label="Cancel"
      secondary={true}
      onClick={(e) => okToSaveChanges(e, false)}
    />,
  ];
  const style = {
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    },
    listTitle: {
      fontSize: 12,
      textTransform: 'capitalize',
      margin: 4,
      display: 'inline-block',
    }, 
    checkbox: {
      marginBottom: 16,
      display: 'inline-block',
    },
  }; 
  const cardDialog = 
      <div>
        <Dialog
          modal={false}
          actions={buttons}
          open={isdialogOpen}
          onRequestClose={closeDialog}
        >
        <div>
          <TextField
            defaultValue={cardTitle}
            name='cardTitle'
            inputStyle={style.cardTitle}
            underlineShow={false}
            onChange={onChangeTextField}
          />
          <div>
            {'In list:'}
            <Chip style={style.listTitle}>
              {listTitle}
            </Chip>
            <Checkbox
              label="Completed"
              style={style.checkbox}
              checked={isCompleted}
              onCheck={toggleCompleted}
            />
          </div>
          <Divider />
          </div>
          <div>
            <TextField
              defaultValue={description}
              floatingLabelText="Description"
              name='description'
              multiLine={true}
              rows={2}
              rowsMax={6}
              fullWidth={true}
              underlineShow={false}
              onChange={onChangeTextField}
            />
          </div>
        </Dialog>
      </div>
  return (
    <div>
        <ListItem 
          style={style.cardTitle}
          onClick={openDialog}
          primaryText={cardTitle}
        />
        {isdialogOpen && cardDialog }
      </div> 

  );
}