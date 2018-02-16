import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List as MaterialList} from 'material-ui/List';
import ListContainer from '../containers/ListContainer';
// import DjelloList from './List';

export default ({board, displayedTitle, listIds, onChangeTextField, buttonShow, saveChanges, cancelChanges}) => {
  console.log("starting board: ", board);
  const listMap = listIds.map(listId => {
    console.log("list", listId);
    return (
      <MaterialList key={listId}>
        <ListContainer listId={listId}/>
      </MaterialList>
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
      key="Canel"
      label="X"
      secondary={true}
      onClick={cancelChanges}
    />
  ]

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
  };

return (
  <Paper zdepth={2}>
    <TextField
      value={displayedTitle}
      name='boardTitle'
      inputStyle={style.boardTitle}
      underlineShow={false}
      onChange={onChangeTextField}
    />
    {buttonShow && buttons}
    <div style={style.listLayout}>
      {listMap}
    </div>
  </Paper>
  );
};
