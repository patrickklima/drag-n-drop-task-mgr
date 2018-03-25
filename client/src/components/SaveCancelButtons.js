import React from 'react';
import FlatButton from 'material-ui/FlatButton';
const SaveCancelButtons = ({saveChanges, cancelChanges}) => {
  return(
    <div>
      <FlatButton
        key="Save"
        label="Save"
        primary={true}
        onClick={saveChanges}
      />
      <FlatButton
        key="Canel"
        label="X"
        secondary={true}
        onClick={cancelChanges}
      />
    </div>
  );
}

export default SaveCancelButtons;