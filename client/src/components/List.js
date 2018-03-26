import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {ListItem} from 'material-ui/List';
import CardContainer from '../containers/CardContainer';
import SaveCancelButtons from './SaveCancelButtons';
import muiThemeable from 'material-ui/styles/muiThemeable';

let List = ({
  muiTheme, //from muiThemeable
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
      padding: 10,
      marginRight: 15,
      marginTop: 10,
      backgroundColor: muiTheme.palette.primary3Color
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

List = muiThemeable()(List);
export default List;
