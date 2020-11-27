export const RESIZE = "CANVAS_RESIZE";
export const SHOW_CANVAS = "SHOW_CANVAS";

export const showCanvas = isShown => ({
  type: SHOW_CANVAS,
  isShown
})

function calcMenorahSize(width, height) {
  const MENORAH_PADDING_LEFT = 100;
  const MENORAH_PADDING_TOP = 10;

  const menorahRatioResolution = 1442 / 1652;
  const heightRatio = 750 / 860;

  const imageHeight = heightRatio * height;
  const imageWidth = menorahRatioResolution * imageHeight;
  const globalRatio = imageHeight / 750;

  const leftPosition = width - imageWidth - globalRatio * MENORAH_PADDING_LEFT;
  const topPosition = height - imageHeight - globalRatio * MENORAH_PADDING_TOP;

  return {
    globalRatio,
    imageWidth,
    imageHeight,
    leftPosition,
    topPosition,
  };
}

export function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    type: RESIZE,
    width,
    height,
    ...calcMenorahSize(width, height),
  };
}

const INITIAL_STATE = {
  height: window.innerHeight,
  width: window.innerWidth,
  globalRatio: 1,
  imageWidth: 750,
  imageHeight: 800,
  leftPosition: 0,
  topPosition: 0,
  isShown: false,
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE: {
      const {
        width,
        height,
        globalRatio,
        imageWidth,
        imageHeight,
        leftPosition,
        topPosition,
      } = action;
      return {
        ...state,
        width,
        height,
        globalRatio,
        imageWidth,
        imageHeight,
        leftPosition,
        topPosition,
      };
    }
    case SHOW_CANVAS: {
      return { ...state, isShown: action.isShown };
    }
    default:
      return state;
  }
}
