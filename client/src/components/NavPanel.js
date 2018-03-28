import React from 'react';
import Drawer from 'material-ui/Drawer';
import AllBoards from '../components/AllBoards';

const NavPanel = ({open, user}) => {
  return (
    <div>
      <Drawer open={open} openSecondary={true}>
        <AllBoards user={user} />
      </Drawer>
    </div>
  );
}

export default NavPanel;