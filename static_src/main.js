import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import App from './App'
import reportWebVitals from './reportWebVitals';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Router from './Components/Router';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}