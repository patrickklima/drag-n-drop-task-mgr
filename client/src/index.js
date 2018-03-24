import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import djelloApp from './reducers';
import AppContainer from './containers/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ligthBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var store = createStore(djelloApp, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(ligthBaseTheme)}>
      <AppContainer />
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root')
);


