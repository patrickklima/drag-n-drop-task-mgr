import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import {grey700} from 'material-ui/styles/colors';

const RegisterOrLogin = ({storeEntry, createNewAccount, toggleCreateNewAccount, sendUserInfo, username, password, isFetchingUser,}) => {
  const style = {
    button: {
      marginTop: 10,
      backgroundColor: grey700
    },
    toggle: {
      marginBottom: 16,
      marginTop: 20,
      fontSize: 16,
    }
  };
  return (
    <div>
      <h2>Log In Or Create Your Account</h2>
      <TextField
        type="text"
        hintText="Enter your username"
        floatingLabelText="Username"
        name="username"
        onChange={storeEntry}
      />
      <br/>
      <TextField
        type="password"
        hintText="Enter your Password"
        floatingLabelText="Password"
        name="password"
        onChange={storeEntry}
      />
      <br/>
      <Toggle
        label="Create a New Account"
        labelPosition="right"
        style={style.toggle}
        toggled={createNewAccount}
        onToggle={toggleCreateNewAccount}
      />
      <FlatButton 
        label={createNewAccount ? "Create Account" : "Log In"} 
        primary={true} 
        style={style.button} 
        onClick={(e) => sendUserInfo(e, username, password, createNewAccount)}
      />
      {isFetchingUser && <CircularProgress />}
    </div>
  );
};

export default RegisterOrLogin;