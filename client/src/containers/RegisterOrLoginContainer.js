import React, {Component} from 'react';
import {connect} from 'react-redux';
import RegisterOrLogin from '../components/RegisterOrLogin';
import{createOrLogInUser as sendUserInfo} from '../actions/UserActions';

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendUserInfo: (e, username, password, createNewAccount) => {
      e.preventDefault();
      dispatch(sendUserInfo(username, password, createNewAccount))
    },
  }
};
class RegistrationContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      createNewAccount: false,
    };
  }
  storeEntry = (e, newValue) => {
    this.setState({[e.target.name]: newValue});
  }
  toggleCreateNewAccount = (e) => {
    this.setState({createNewAccount: !this.state.createNewAccount});
  }
  
  
  render() {
    const {createNewAccount, username, password} = this.state;
    const {sendUserInfo} = this.props;

    return (
      <RegisterOrLogin 
        storeEntry={this.storeEntry}
        toggleCreateNewAccount={this.toggleCreateNewAccount}
        createNewAccount={createNewAccount}
        sendUserInfo={sendUserInfo}
        username={username}
        password={password}

      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);