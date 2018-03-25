import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List as MaterialList} from 'material-ui/List';
import ListContainer from '../containers/ListContainer';

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
  
  const saveCancelButtons = [
    <FlatButton
      key="Save"
      label="Save"
      primary={true}
      onClick={saveChanges}
    />,
    <FlatButton
      key="Canel"
      label="X"
      secondary={true}
      onClick={cancelChanges}
    />
  ];

  const style = {
    boardTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      textTransform: 'capitalize'
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
    {changingTitle && saveCancelButtons}

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
      {addingNewList && saveCancelButtons}
    </div>
  </div>
  );
};

export default Board;