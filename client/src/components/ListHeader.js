import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default ({
  displayedTitle, 
  onChangeTextField, 
  changingTitle, 
  saveChanges, 
  cancelChanges
}) =>  {
  const style = {
    displayedTitle: {
      fontSize: 28,
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
      <TextField
        value={displayedTitle}
        name='displayedTitle'
        inputStyle={style.displayedTitle}
        underlineShow={false}
        onChange={onChangeTextField}
      />
      {changingTitle && saveCancelButtons}
    </div>
  );
};

