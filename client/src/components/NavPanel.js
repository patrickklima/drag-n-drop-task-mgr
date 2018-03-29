import React from 'react';
import Drawer from 'material-ui/Drawer';
import AllBoards from '../components/AllBoards';

const NavPanel = ({open, user, toggleNavPanel}) => {
  const style = {
    content: {
      padding: 20,
    }
  };
  return (
    <div>
      <Drawer 
        open={open} 
        openSecondary={true}
        docked={false}
        onRequestChange={toggleNavPanel}
        width={500}
      >
        <div style={style.content}>
          <AllBoards user={user} />
        </div>
      </Drawer>
    </div>
  );
}

export default NavPanel;