import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import NavPanel from '../components/NavPanel';


class NavBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navPanelIsOpen: false,
    };
  }
  toggleNavPanel = () => {
    this.setState({navPanelIsOpen: !this.state.navPanelIsOpen});
  }
  render() {
    const {navPanelIsOpen} = this.state;
    return (
      <AppBar
        title="Drag n Drop Task Manager"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.toggleNavPanel}
        children={
          <NavPanel 
            open={navPanelIsOpen} 
            toggleNavPanel={this.toggleNavPanel}
          />}
      />
    );
  }
};

export default NavBarContainer;