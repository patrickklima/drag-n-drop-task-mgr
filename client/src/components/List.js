import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CardContainer from '../containers/CardContainer';

export default ({list, displayedTitle, onChangeTextField, buttonShow, saveChanges, cancelChanges}) =>  {
  
  const cardMap = list.cards.map(cardId => {
    console.log("cardMap", cardId);
    return (
      <div key={cardId}>
        <CardContainer cardId={cardId} listId={list._id}/>
      </div>
    );
  });
  const buttons = [
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
  ]

  const style = {
    listTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }; 
  return (
    
    <div >
      <TextField
        defaultValue={list.listTitle}
        value={displayedTitle}
        name='listTitle'
        inputStyle={style.listTitle}
        underlineShow={false}
        onChange={onChangeTextField}
      />
      {buttonShow && buttons}
      {cardMap}
    </div>
  );
};

