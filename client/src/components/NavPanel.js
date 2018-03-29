import React from 'react';
import Drawer from 'material-ui/Drawer';
import AllBoardsContainer from '../containers/AllBoardsContainer';

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
          <AllBoardsContainer />
        </div>
      </Drawer>
    </div>
  );
}

export default NavPanel;