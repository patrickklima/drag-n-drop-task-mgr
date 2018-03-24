import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {Paper, List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';

const AllBoards = ({user}) => {
  const boardMap = user.boards.map(board => {
    return (
      <Link to={`/board/${board._id}`} key={board._id}>
        <ListItem 
          leftAvatar={<Avatar icon={<FileFolder />} />}
          primaryText={board.boardTitle}
        />
      </Link>
    );
  })
  return (
      <Paper zdepth={2}>
        <div>
          <h2>Choose a Board or Start a New One</h2>
          <List>
            {boardMap}
          </List>
        </div>
      </Paper>
  );
}
export default AllBoards;