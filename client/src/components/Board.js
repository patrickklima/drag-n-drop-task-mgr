import React from 'react';
import Paper from 'material-ui/Paper';
import {List as MaterialList} from 'material-ui/List';
import ListContainer from '../containers/ListContainer';
// import DjelloList from './List';

export default ({board, listIds}) => {
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
      textTransform: 'capitalize'
    },
    listLayout: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

return (
  <Paper zdepth={2}>
    <h2 style={style.boardTitle}>{board.boardTitle}</h2>
    <div style={style.listLayout}>
      {listMap}
    </div>
  </Paper>
  );
};
