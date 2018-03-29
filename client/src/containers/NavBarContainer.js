import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import NavPanel from '../components/NavPanel';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToUser = (dispatch) => {
  return {
  
  };
};

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
    const {user} = this.props;
    const {navPanelIsOpen} = this.state;
    return (
      <AppBar
        title="Drag n Drop Task Manager"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.toggleNavPanel}
        children={
          <NavPanel 
            open={navPanelIsOpen} 
            user={user}
            toggleNavPanel={this.toggleNavPanel}
          />}
      />
    );
  }
};

NavBarContainer = connect(mapStateToProps, mapDispatchToUser)(NavBarContainer);
export default NavBarContainer;