import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default ({storeEntry, registerUser, username, password}) => {
  const style = {
    button: {
      margin: 15,
    }
  };
  return (
    <div>
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
      <FlatButton 
        label="Submit" 
        primary={true} 
        style={style.button} 
        onClick={() => registerUser(username, password)}
      />
    </div>
  );
};