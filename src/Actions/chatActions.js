export const ADD_CHAT = '@@chat/ADD_CHAT';
export const START_CHATS_LOADING = '@@chat/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chat/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chat/ERROR_CHATS_LOADING';
export const DELETE_CHAT = '@@chat/DELETE_CHAT';
export const BLINK_CHAT = '@@message/BLINK_MESSAGE';
import { normalize } from 'normalizr';
import { chats } from '../utils/schemas';
import { RSAA, getJSON } from 'redux-api-middleware';


export const addChat = title => ({
  type: ADD_CHAT,
  title,
});

export const deleteChat = chatId => ({
  type: DELETE_CHAT,
  chatId,
});

export const blinkChat = (chatId, isOn) => ({
  type: BLINK_CHAT,
  chatId,
  isOn,
});

export const loadChats = () => ({
  [RSAA]: {
    endpoint: '/api/chats.json',
    method: 'GET',
    types: [
      START_CHATS_LOADING,
      {
        type: SUCCESS_CHATS_LOADING,
        payload: (action, state, res) => getJSON(res).then(
          json => normalize(json, [chats]),
        ),
      },
      ERROR_CHATS_LOADING,
    ],
  },
});