import React, {Component} from 'react';
import {connect} from 'react-redux';
import Registration from '../components/Registration';
import{registerUser} from '../actions/UserActions';

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (username, password) => dispatch(registerUser(username, password)),
  }
};
class RegistrationContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    };
  }
  storeEntry = (e, newValue) => {
    this.setState({[e.target.name]: newValue});
  }
  
  render() {
    const {registerUser} = this.props;
    const {username, password} = this.state;

    return (
      <Registration 
        storeEntry={this.storeEntry}
        registerUser={registerUser}
        username={username}
        password={password}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);