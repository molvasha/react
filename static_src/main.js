import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../static/build/App';
import reportWebVitals from './reportWebVitals';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const messages = ['Привет', 'Как дела?'];
const MessageComponent = (props) => <div>{props.text}</div>;
const MessageField = (props) => {
  return props.messages.map(message => <MessageComponent text={message}/>);
};
ReactDOM.render(
  <MessageField messages={messages}/>,
  document.getElementById('root'),
);