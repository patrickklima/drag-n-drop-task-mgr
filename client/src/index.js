import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import djelloApp from './reducers';
import AppContainer from './containers/AppContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500, grey700} from 'material-ui/styles/colors';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


var store = createStore(djelloApp, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())
);

const importedTheme = darkBaseTheme;
const customGlobalStyles = {
  ...importedTheme,
  palette: {
    ...importedTheme.palette,
    textColor: cyan500,
    primary3Color: grey700,
  },
  appBar: {
    ...importedTheme.appBar,
    height: 80,
  },
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(customGlobalStyles)}>
      <DragDropContextProvider backend={HTML5Backend}>
        <AppContainer />
      </DragDropContextProvider>
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root')
);


