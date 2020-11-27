export const SHOW_BUBBLE = "SHOW_BUBBLE";
export const HIDE_BUBBLE = "HIDE_BUBBLE";
export const CHANGE_CONTENT = "CHANGE_CONTENT";
export const RESIZE = "BUBBLE_RESIZE";

export const resizeSpeechBubble = (bottom, left) => ({
  type:RESIZE,
  bottom,
  left,
}) 

const SPEECH_BUBBLE_INITIAL_STATE = {
  show: false,
  content: "",
  bottom: 250,
  left: 175
};

export function reducer(state = SPEECH_BUBBLE_INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_BUBBLE: {
      return { ...state, show: true };
    }
    case HIDE_BUBBLE: {
      return { ...state, show: false };
    }
    case CHANGE_CONTENT: {
      const { content } = action;
      return { ...state, content };
    }
    default:
      return state;
  }
}
