export const OPEN_THEATER_CURTAIN = "OPEN_THEATER_CURTAIN";
export const TURN_ON_LIGHT = "TURN_ON_LIGHT";
export const START_SHOW = "START_SHOW";
export const LOAD_ASSET = "LOAD_ASSET";
export const SET_RESIZE_RATIO = "SET_RESIZE_RATIO";
export const SET_FOCUS_DONE = "SET_FOCUS_DONE";


export const ALL_ASSETS = [
  "cinematic-transition-intro-theme.mp3",
  "match-strike-sound-effect.mp3",
  "match-strike-sound-effect.mp3",
  "sad-trumpet-sound.mp3",
  "wah-wah-wah-sound-effect.mp3",
  "panda.svg",
  "curtain-opening.gif",
  "curtain-opening-first-frame.png",
  "night-sky.jpg"
]

export const checkIsLoading = (loadedAssests) => (
  !ALL_ASSETS.every(assest => loadedAssests.has(assest))
)

export const loadAssest = name => ({
  type: LOAD_ASSET,
  name
})

export const startShow= isShowStarted => ({
  type: START_SHOW,
  isShowStarted
})

export const openTheaterCurtain= isTheaterCurtainOpen => ({
  type: OPEN_THEATER_CURTAIN,
  isTheaterCurtainOpen
})

export const turnOnLight= isLightOn => ({
  type: TURN_ON_LIGHT,
  isLightOn
})

export const setResizeRatio = resizeRatio => ({
  type: SET_RESIZE_RATIO,
  width: window.innerWidth
});

export const setFocusDone = wasFocusDone => ({
  type: SET_FOCUS_DONE,
  wasFocusDone
})



const INITIAL_STATE = {
  initialWidth: window.innerWidth,
  loadedAssests: new Set([]),
  isLightOn: false,
  isShowStarted: false,
  isTheaterCurtainOpen: false,
  resizeRatio: 1,
  wasFocusDone: false
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
    case START_SHOW: {
      const {
        isShowStarted
      } = action;
      return {
        ...state,
        isShowStarted
      };
    }
    case LOAD_ASSET: {
      const {
        name
      } = action;
      console.log("LOAD_ASSET", name)
      const { loadedAssests } = state;
      const newLoadedAssets = new Set([...loadedAssests]);
      newLoadedAssets.add(name);
      return ({ ...state, loadedAssests: newLoadedAssets });
    }
    case SET_RESIZE_RATIO: {
      const {
        width
      } = action;
      return ({ ...state, resizeRatio: 1 / (width / state.initialWidth) });
    }

    case SET_FOCUS_DONE: {
      const {
        wasFocusDone
      } = action;
      return ({ ...state, wasFocusDone });
    }
    default:
      return state;
  }
}
