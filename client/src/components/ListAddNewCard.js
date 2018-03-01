import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';

export default ({
  newCardTitle, 
  onChangeTextField, 
  addingNewCard, 
  saveChanges, 
  cancelChanges
}) =>  {
  const style = {
    newCardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }; 

  const saveCancelButtons = [
    <FlatButton
      key="Save"
      label="Save"
      primary={true}
      onClick={saveChanges}
    />,
    <FlatButton
      key="Cancel"
      label="X"
      secondary={true}
      onClick={cancelChanges}
    />
  ];

  return (
    <div >
      <ListItem>
        <TextField
          value={newCardTitle}
          hintText='Add a new card...'
          name='newCardTitle'
          inputStyle={style.textField}
          underlineShow={false}
          onChange={onChangeTextField}
        />
      </ListItem>
      {addingNewCard && saveCancelButtons}
    </div>
  );
};

