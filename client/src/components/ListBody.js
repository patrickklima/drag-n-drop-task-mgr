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

  const cardMap = list.cards.map(cardId => {
    console.log("cardMap", cardId);
    return (
      <CardContainer key={cardId} cardId={cardId} listId={list._id}/>
    );
  });

  return (
    <div className='container' ref={dragulaDecorator}>
      {cardMap}
    </div>
  );
};

