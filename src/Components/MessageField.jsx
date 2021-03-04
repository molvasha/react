import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Message from './Message';
import {botPhrases} from './utils';
import PropTypes from 'prop-types';

export default class MessageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      overloadBot: {
        timer: null,
        tick: 0,
        maxTick: 5,
        text: 'Остановись! Хватит болтать',
      },
    };

    this.chatWindow = React.createRef();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.messages.length < this.state.messages.length) {
  //     const {messages, overloadBot} = this.state;
  //     const lastSender = messages[messages.length - 1].sender;
  //     const preLastSender = messages[messages.length - 2].sender;
  //     if (overloadBot.tick === overloadBot.maxTick) {
  //       overloadBot.tick = 0;
  //       this.sendMessage(overloadBot.text, 'bot');
  //     } else if (lastSender === 'me' && preLastSender === 'me') {
  //       overloadBot.tick += 1;
  //       this.botSendMessage();
  //     } else if (lastSender === 'me') {
  //       this.botSendMessage();
  //     }
  //   }
  // }

  botSendMessage() {
    const {overloadBot} = this.state;
    clearTimeout(overloadBot.timer);
    overloadBot.timer = setTimeout(() => {
      overloadBot.tick = 0;
      this.props.sendMessage(botPhrases(), 'bot');
    }, 1000);
  }

  handlesendMessage(text, sender) {
    if (text.length > 0) {
      this.props.sendMessage(text, sender);
      if (sender !== 'bot') {
        this.botSendMessage();
      }
      this.setState({textFieldValue: ''});

      const chatWindow = this.chatWindow.current;
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    }
  }

  handleChange(event) {
    this.setState({textFieldValue: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      const {textFieldValue} = this.state;
      this.handlesendMessage(textFieldValue, 'me');
    }
  }

  render() {
    const {
      chatId, chats, messages,
    } = this.props;
    const messageElements = chats[chatId].messageList.map(messageId => <Message key={messages[messageId].id}
                                                                                message={messages[messageId]}/>);

    return (
      <>
        <div className="message-field" ref={this.chatWindow}>{messageElements}</div>
        <div className="text-field">
          <TextField
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.handleKeyUp.bind(this)}
            fullWidth
            margin="normal"
            type="text"
            autoFocus
            placeholder="Write a message..."
            value={this.state.textFieldValue}
          />
          <button onClick={() => this.handlesendMessage(this.state.textFieldValue, 'me')} type="button">Отправить
          </button>
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