import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import MessageField from './MessageField.jsx';
import ChatList from './ChatList.jsx';
import uuid from '../utils/uuid.js';
import ChatHeader from "./ChatHeader.jsx";

export default class ChatLayout extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {chatId} = this.props;

    return (
      <Grid className="grid-container" container alignItems="stretch">
        <Hidden only={['xs', 'sm']}>
          <Grid className="chatList" item xs={3}>
            <ChatList chats={chats}/>
          </Grid>
        </Hidden>
        <Grid className="messageField" item xs>
          <ChatHeader title={chats[chatId].title}/>
          <MessageField chatId={chatId} chats={chats} messages={messages} sendMessage={this.sendMessage.bind(this)}/>
        </Grid>
      </Grid>
    );
  }
}
ChatLayout.propTypes = {
  chatId: PropTypes.number,
};
ChatLayout.defaultProps = {
  chatId: 0,
};
