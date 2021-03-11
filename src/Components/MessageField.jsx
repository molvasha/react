import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Message from './Message.jsx';
import botPhrases from '../utils/botPhrases.js';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux';
import Redirect from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import sendMessage from '../Actions/messageActions.js';

class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };

    this.chatWindow = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handlesendMessage(text, sender) {
    if (text.length > 0) {
      const {
        chatId, messages,
      } = this.props;
      const messageId = Object.keys(messages).length + 1;

      this.props.sendMessage(messageId, text, sender, chatId);

      this.setState({input: ''});

      const chatWindow = this.chatWindow.current;
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    }
  }

  handleChange(event) {
    if (event.keyCode === 13) {
      const {input} = this.state;
      this.handleSendMessage(input, 'me');
    }
  }

  render() {
    const {
      chatId, chats, messages,
    } = this.props;
    const {input} = this.state;

    if (!chats[chatId]) {
      return <Redirect to="/"/>;
    }

    const messageElements = chats[chatId].messageList.map(messageId => (
      <Message
        key={`${messageId}${messages[messageId].text}`}
        text={messages[messageId].text}
        sender={messages[messageId].sender}
      />
    ));

    return (
      <>
        <div className="message-field" ref={this.chatWindow}>{messageElements}</div>
        <div className="text-field">
          <TextField
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            fullWidth
            margin="normal"
            type="text"
            autoFocus
            placeholder="Пишет..."
            value={input}
          />
          <button onClick={() => this.handlesendMessage(input, 'me')} type="button">Отправить</button>
        </div>
      </>
    );
  }
}

MessageField.propTypes = {
  chatId: PropTypes.number.isRequired,
  chats: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = ({chatReducer, messageReducer}) => ({
  chats: chatReducer.chats,
  messages: messageReducer.messages,
});
const mapDispatchToProps = dispatch => bindActionCreators({sendMessage}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageField);