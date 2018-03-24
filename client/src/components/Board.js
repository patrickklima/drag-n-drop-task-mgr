import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List as MaterialList} from 'material-ui/List';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ListContainer from '../containers/ListContainer';

let Board = ({
  muiTheme,  //from muiThemeable HOC
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
    boardContainer: {
      padding: muiTheme.spacing.desktopGutter,
    },
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
  <Paper zdepth={2} style={style.boardContainer}>
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
  </Paper>
  );
};

Board = muiThemeable()(Board);
export default Board;