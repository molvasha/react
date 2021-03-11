import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/styles.css';
import App from '../src/App.js'
//import reportWebVitals from './reportWebVitals';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Router from '../src/Components/Router.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

export default class App2 extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}