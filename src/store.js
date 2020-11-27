import { combineReducers, createStore } from "redux";
import {
  bubble,
  characterReducer,
  canvas,
  general
} from './reducers'

export function configureStore() {
  return createStore(
    combineReducers({
      canvas: canvas.reducer,
      character: characterReducer,
      speechBubble: bubble.reducer,
      general: general.reducer
    })
  );
}

export const store = configureStore();
