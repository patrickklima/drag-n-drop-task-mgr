import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';
import CardContainer from '../containers/CardContainer';

export default ({
  dragulaDecorator,
  list, 
  displayedTitle, 
  newCardTitle, 
  onChangeTextField, 
  changingTitle, 
  addingNewCard, 
  saveChanges, 
  cancelChanges
}) =>  {
  const style = {
    displayedTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    },
    newCardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }; 

  const cardMap = list.cards.map(cardId => {
    console.log("cardMap", cardId);
    return (
      <CardContainer key={cardId} cardId={cardId} listId={list._id}/>
    );
  });
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
      <div className='container' ref={dragulaDecorator}>
        {cardMap}
      </div>
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

