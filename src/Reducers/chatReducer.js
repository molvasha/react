import update from 'react-addons-update';
import {SEND_MESSAGE} from '../Actions/messageActions.js';
import {ADD_CHAT, DELETE_CHAT, BLINK_CHAT} from '../Actions/chatActions.js';

const initialStore = {
  chats: [
    {
      title: 'Olga',
      messageList: [0],
      unreadMessage: false,
    },
    {
      title: 'Ivan',
      messageList: [1],
      unreadMessage: false,
    },
  ],
};
export default (store = initialStore, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return update(store, {
        chats: {
          [action.chatId]: {
            messageList: {$push: [action.messageId]},
          },
        },
      });
    }

    case ADD_CHAT: {
      return update(store, {
        chats: {
          $push: [{title: action.title, messageList: [], unreadMessage: 0}],
        },
      });
    }

    case DELETE_CHAT: {
      return update(store, {
        chats: {
          $splice: [[action.chatId, action.chatId]],
        },
      });
    }

    case BLINK_CHAT: {
      return update(store, {
        chats: {
          [action.chatId]: {
            unreadMessage: {$set: action.isOn},
          },
        },
      });
    }

    default:
      return store;
  }
};