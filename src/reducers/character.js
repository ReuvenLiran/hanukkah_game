const setConstName = name => `CHARACTER_${name}`;
export const MOVE_IMAGE = setConstName("MOVE_IMAGE");
export const CHANGE_IMAGE = setConstName("CHANGE_IMAGE");
export const SET_ANIMATION_TYPE = setConstName("SET_ANIMATION_TYPE");
export const SET_CLASS_NAME = setConstName("SET_CLASS_NAME");
export const UPDATE_LOCATION = setConstName("UPDATE_LOCATION");
export const SET_TRANSITION_TIME = setConstName("SET_TRANSITION_TIME");

const INITIAL_STATE = {
  className: "",
  animationType: 'SPEAKING',
  imageNumber: 0,
  backgroundImage: "panda_talking.svg",
  x: 0,
  y: 0,
  transitionTime: 0,
};

export function characterReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MOVE_IMAGE: {
      return { ...state, imageNumber: action.imageNumber };
    }
    case CHANGE_IMAGE: {
      return { ...state, backgroundImage: action.backgroundImage };
    }
    case SET_ANIMATION_TYPE: {
      return { ...state, animationType: action.animationType };
    }
    case SET_CLASS_NAME: {
      return { ...state, className: action.className };
    }
    case UPDATE_LOCATION: {
      return { ...state, x: action.x, y: action.y };
    }
    case SET_TRANSITION_TIME: {
      return ({ ...state, transitionTime: action.transitionTime })
    }
    default:
      return state;
  }
}
