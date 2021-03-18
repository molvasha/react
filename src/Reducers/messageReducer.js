import update from 'react-addons-update';
import { SEND_MESSAGE} from '../Actions/messageActions.js';
import {
  START_CHATS_LOADING,
  SUCCESS_CHATS_LOADING,
  ERROR_CHATS_LOADING,
} from '../Actions/chatActions';

const initialStore = {
  messages: {
    0: {text: 'Привет!', sender: 'bot'},
    1: {text: 'Здравствуйте!', sender: 'bot'},
  },
  isLoading: false,
};
export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      return update(store, {
        messages: {$merge: {[action.messageId]: {text: action.text, sender: action.sender}}},
      });
    }

    case START_MESSAGES_LOADING: {
      return update(store, {
        isLoading: { $set: true },
      });
    }
    case SUCCESS_MESSAGES_LOADING: {
      const messages = {};
      action.payload.forEach(msg => {
        const { text, sender } = msg;
        messages[msg.id] = { text, sender };
      });
      return update(store, {
        messages: { $set: messages },
        isLoading: { $set: false },
      });
    }
    case ERROR_MESSAGES_LOADING: {
      return update(store, {
        isLoading: { $set: false },
      });
    }

    default:
      return store;
  }
}