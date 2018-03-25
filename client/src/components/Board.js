import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List as MaterialList} from 'material-ui/List';
import ListContainer from '../containers/ListContainer';
import SaveCancelButtons from './SaveCancelButtons';

let Board = ({
  board, 
  displayedTitle, 
  listIds, 
  newListTitle, 
  onChangeTextField, 
  changingTitle, 
  addingNewList, 
  saveChanges, 
  cancelChanges
}) => {
  console.log("starting board: ", board);
  const listMap = listIds.map(listId => {
    console.log("list", listId);
    return (
      <MaterialList key={listId}>
        <ListContainer listId={listId}/>
      </MaterialList>
    );
  });
  
  
  const style = {
    boardTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      textTransform: 'capitalize', 
      border: '2px solid #FF0250', 
      paddingLeft: 10
    },
    listLayout: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    newListTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  };

return (
  <div>
    <TextField
      value={displayedTitle}
      name='displayedTitle'
      inputStyle={style.boardTitle}
      underlineShow={false}
      onChange={onChangeTextField}
    />
    { changingTitle && 
      <SaveCancelButtons 
        saveChanges={saveChanges}
        cancelChanges={cancelChanges}
      />}
    <div style={style.listLayout}>
      {listMap}
      <TextField
        value={newListTitle}
        hintText='Add a new list...'
        name='newListTitle'
        inputStyle={style.newListTitle}
        underlineShow={false}
        onChange={onChangeTextField}
      />
      { addingNewList && 
        <SaveCancelButtons 
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
        />}
    </div>
  </div>
  );
};

export default Board;