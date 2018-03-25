import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';
import CardContainer from '../containers/CardContainer';
import SaveCancelButtons from './SaveCancelButtons';

const List = ({
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
    listBox: {
      margin: 10,
    },
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
      <div key={cardId}>
        <CardContainer cardId={cardId} listId={list._id}/>
      </div>
    );
  });

  return (
    <div style={style.listBox}>
      <TextField
        value={displayedTitle}
        name='displayedTitle'
        inputStyle={style.displayedTitle}
        underlineShow={false}
        onChange={onChangeTextField}
      />
      { changingTitle && 
        <SaveCancelButtons 
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
        />}
      {cardMap}
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
      { addingNewCard && 
        <SaveCancelButtons 
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
        />}
    </div>
  );
};

export default List;
