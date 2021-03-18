import update from 'react-addons-update';
import {SEND_MESSAGE, SUCCESS_MESSAGES_LOADING} from '../Actions/messageActions.js';
import {ADD_CHAT, DELETE_CHAT, BLINK_CHAT} from '../Actions/chatActions.js';
import { SUCCESS_CHATS_LOADING } from "../Actions/chatActions";

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
  isLoading: true,
};
export default (store = initialStore, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return update(store, {
        chats: {$merge:{ [action.chatId]: {
            messageList: [...store.chats[action.chatId].messageList, action.messageId]
            } } },
      });
    }


    case SUCCESS_CHATS_LOADING: {
      return update(store, {
        chats: { $set: action.payload.entities.chats },
        isLoading: { $set: false },
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