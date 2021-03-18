import './css/styles.css';
import React, {Component} from 'react';
import Provider from 'react-redux';
import ConnectedRouter from 'connected-react-router';
import PersistGate from 'redux-persist/integration/react';
import Router from './Components/Router.jsx';
import store from './utils/store.js';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Router/>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}