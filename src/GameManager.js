import React from "react";
import { store } from "./store.js";
import { canvas, bubble, general } from "./reducers";
import {
  animateSpeakWithCandle,
  startShow,
  updateLocation,
  animateSpeak,
  animateUseCandle,
  animateWalking,
} from "./AnimationManager";

const { SHOW_BUBBLE, HIDE_BUBBLE, CHANGE_CONTENT } = bubble;

const TYPES = {
  ANIMATE: "animate",
  MESSAGE: "message",
  INSTRUCTION: "instruction",
};

const animateCandle = (candle, isError) => {
  if (isError) {
    animateSpeakWithCandleWrapper(["Oops!", "Wrong Candle!"]);
  } else {
    animateSpeakWithCandleWrapper([`Light the ${candle} candle!`]);
  }
};

const animateSpeakWithCandleWrapper = (sentences) => {
  animateSpeakWrapper(sentences, true);
};

const animateSpeakWrapper = (sentences, withCandle) => {
  let j = 0;
  const callbacks = [];

  sentences.reverse().forEach((sentence, i) => {
    const lastCallback = callbacks[j - 1];

    callbacks.push(() => {
      // if (withCandle) {
      //   animateSpeakWithCandle(sentence, lastCallback, 500);
      // } else {
      animateSpeak(withCandle, sentence, lastCallback, 500);
      // }
    });
    j += 1;
  });

  callbacks[callbacks.length - 1]();
};

const INSTRUCTIONS = [
  {
    type: TYPES.ANIMATE,
    duration: 1000,
    // duration: 30000,
    animate: () => {
      setTimeout(() => {
        const { resizeRatio, globalRatio } = store.getState().canvas;
        // updateLocation(0 - (350 * 1.5 * globalRatio), 0);
        updateLocation(0 - (350 * 1.5), 0);

        document.querySelector("#audio-cinematic-intro").play();
       }, 100);      
      store.dispatch(general.startShow(true));
    },
  },
  // {
  //   type: TYPES.ANIMATE,
  //   duration: 1500,
  //   animate: () => {
  //     store.dispatch(general.turnOnLight(true));
  //   },
  // },
  // {
  //   type: TYPES.ANIMATE,
  //   duration: 20000,
  //   animate: () => {
  //     store.dispatch(canvas.showCanvas(true));
  //     // animateWalking(5000)
  //   },
  // },
  {
    type: TYPES.ANIMATE,
    duration: 7000,
    // duration: 100000,
    animate: () => {

      store.dispatch(general.setFocusDone(true));
      // animateSpeakWithCandleWrapper([`
      // There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k 
      // There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k 
      // There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k 
      // There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k 
      // There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k 
      // Hey There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k `, "Can you light my candle?"]);

      animateWalking(5000, null, 'walk-start', 
        350 * 1.5 + 100
      );
      // const video = document.querySelector("#video-curtain-opening");
      // video.width = window.innerWidth;
      // video.height = window.innerHeight
      // video.play();
      // store.dispatch(general.openTheaterCurtain(true));
    },
  },
  {
    type: TYPES.ANIMATE,
    duration: 3000,
    animate: () => {
      animateUseCandle(2000);
    },
  },
  {
    type: TYPES.INSTRUCTION,
    text: () => (
      <div>
        Hey there
        <br />
        Can you light my candle?
      </div>
    ),
    animate: () => {
      // animateSpeakWithCandleWrapper(["Hey There djfkljf sjfksf sjfks sjfks sjfks jfskjfs sjdks sdjksd sjdksd dsjdks dskjdks djskd skdnks csk cks ks dks kds kd kd kds k kd k k k k k k k k k k k k k ", "Can you light my candle?"]);
      animateSpeakWithCandleWrapper(["Hey There", "Can you light my candle?"]);
    },
    data: {
      candleIndex: 0,
    },
  },
  {
    type: TYPES.MESSAGE,
    duration: 5000,
    text: () => (
      <div>
        Hey!
        <br />
        I am Bob the bear.
        <br />
        Happy Hanukka!
      </div>
    ),
    animate: () => {
      animateSpeakWithCandleWrapper([
        "Hey!",
        "I am Bob the bear",
        "Happy Hannuka!",
      ]);
    },
  },
  {
    type: TYPES.INSTRUCTION,
    animate: (isError) => {
      animateCandle("first", isError);
    },
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the first candle",
    data: {
      candleIndex: 1,
    },
  },
  {
    type: TYPES.MESSAGE,
    text: () => "Amazing!",
    animate: () => {
      animateSpeakWithCandleWrapper(["Amazing!"]);
    },
    duration: 3000,
  },
  {
    type: TYPES.INSTRUCTION,
    animate: (isError) => {
      animateCandle("third", isError);
    },
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the third candle",
    data: {
      candleIndex: 3,
    },
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the sixth candle",
    animate: (isError) => {
      animateCandle("sixth", isError);
    },
    data: {
      candleIndex: 6,
    },
  },
  {
    type: TYPES.MESSAGE,
    text: () => "Excellent!",
    duration: 3000,
    animate: (isError) => {
      animateSpeakWithCandleWrapper(["Excellent!"]);
    },
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the ninth candle",
    animate: (isError) => {
      animateCandle("ninth", isError);
    },
    data: {
      candleIndex: 9,
    },
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the forth candle",
    animate: (isError) => {
      animateCandle("forth", isError);
    },
    data: {
      candleIndex: 4,
    },
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the second candle",
    animate: (isError) => {
      animateCandle("second", isError);
    },
    data: {
      candleIndex: 2,
    },
  },
  {
    type: TYPES.MESSAGE,
    text: () => "You are on fire!",
    animate: () => {
      animateSpeakWithCandleWrapper(["You are on fire!"]);
    },
    duration: 3000,
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the seventh candle",
    animate: (isError) => {
      animateCandle("seventh", isError);
    },
    data: {
      candleIndex: 7,
    },
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the eighth candle",
    animate: (isError) => {
      animateCandle("eighth", isError);
    },
    data: {
      candleIndex: 8,
    },
  },
  {
    type: TYPES.INSTRUCTION,
    error: () => "Oops! Wrong Candle!",
    text: () => "Light the fith candle",
    animate: (isError) => {
      animateCandle("fith", isError);
    },
    data: {
      candleIndex: 5,
    },
  },
  {
    type: TYPES.MESSAGE,
    text: () => "Good Job!",
    duration: 3000,
  },
  {
    type: TYPES.MESSAGE,
    text: () => (
      <div>
        Hey, do you like sufganyot?
        <br />
        We are going to bake some now!
      </div>
    ),
    duration: 7000,
  },
];

let instructionIndex = -1;

const showBubble = () =>
  store.dispatch({
    type: SHOW_BUBBLE,
  });

const hideBubble = () =>
  store.dispatch({
    type: HIDE_BUBBLE,
  });

const changeContent = (content) =>
  store.dispatch({
    type: CHANGE_CONTENT,
    content,
  });

export function showInstruction(showError) {
  if (!showError) {
    instructionIndex += 1;
  }

  const instruction = INSTRUCTIONS[instructionIndex];

  if (instruction) {
    hideBubble();

    setTimeout(() => {
      changeContent("");

      if (instruction.animate) {
        instruction.animate(showError);
      }

      if (instruction.text || instruction.error) {
        if (instruction.type === TYPES.MESSAGE) {
          changeContent(instruction.text());

          if (instruction.callbackBefore) {
            instruction.callbackBefore();
          }
          setTimeout(function () {
            if (instruction.callbackAfter) {
              instruction.callbackAfter();
            }
            showInstruction();
          }, instruction.duration);
        } else if (instruction.type === TYPES.INSTRUCTION) {
          if (showError) {
            changeContent(instruction.error());

            instructionIndex -= 1;
            setTimeout(() => {
              showInstruction();
            }, 2500);
          } else {
            changeContent(instruction.text());
          }
        }
        instruction && showBubble();
      } else if (instruction.type === TYPES.ANIMATE) {
        setTimeout(() => {
          showInstruction();
        }, instruction.duration);
      }
    }, 500);
  } else {
    hideBubble();
  }
}

export function getCurrentInstruction() {
  return INSTRUCTIONS[instructionIndex];
}
