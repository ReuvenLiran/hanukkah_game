export const MOVE_IMAGE = "MOVE_IMAGE";
export const CHANGE_IMAGE = "CHANGE_IMAGE";
export const SET_ANIMATION_TYPE = "SET_ANIMATION_TYPE";

const INITIAL_STATE = {
  animationType: 'SPEAKING',
  imageNumber: 0,
  backgroundImage: "panda_talking.svg",
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
    default:
      return state;
  }
}
