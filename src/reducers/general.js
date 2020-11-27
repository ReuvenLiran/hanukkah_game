export const OPEN_THEATER_CURTAIN = "OPEN_THEATER_CURTAIN";
export const TURN_ON_LIGHT = "TURN_ON_LIGHT";

export const openTheaterCurtain= isTheaterCurtainOpen => ({
  type: OPEN_THEATER_CURTAIN,
  isTheaterCurtainOpen
})

export const turnOnLight= isLightOn => ({
  type: TURN_ON_LIGHT,
  isLightOn
})

const INITIAL_STATE = {
  isLightOn: false,
  isTheaterCurtainOpen: false,
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_THEATER_CURTAIN: {
      const {
        isTheaterCurtainOpen
      } = action;
      return {
        ...state,
        isTheaterCurtainOpen
      };
    }
    case TURN_ON_LIGHT: {
      const {
        isLightOn
      } = action;
      return {
        ...state,
        isLightOn
      };
    }
    default:
      return state;
  }
}
