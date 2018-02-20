import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

export default ({storeEntry, createNewAccount, toggleCreateNewAccount, sendUserInfo, username, password, }) => {
  const style = {
    button: {
      margin: 15,
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
        onClick={() => sendUserInfo(username, password, createNewAccount)}
      />
    </div>
  );
};