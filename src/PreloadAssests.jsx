import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getImgUrl, getSoundsUrl } from "./utils";
import { general } from "./reducers";

const Audio = (props) => {
  const { className, id, name, loadAssest } = props;
  return (
    <audio className={className} id={id} onCanPlay={(e) => loadAssest(name)}>
      <source src={getSoundsUrl(name)} type="audio/mpeg" />
    </audio>
  );
};
const Img = (props) => {
  const { name, loadAssest } = props;
  return <img src={getImgUrl(name)} onLoad={(e) => loadAssest(name)} />;
};

function preloadImages(loadAssest) {
  [
    "night-sky.jpg",
    "panda.svg",
    "curtain-opening.gif",
    "curtain-opening-first-frame.png",
  ].forEach((name) => {
    const img = new Image();
    img.src = getImgUrl(name);
    img.onload = () => loadAssest(name);
  });
}

function PreloadAssests(props) {
  const { loadAssest } = props;

  useEffect(() => {
    preloadImages(loadAssest);
  }, []);
  return (
    <div className="preload-assests">
      <Audio
        id="audio-cinematic-intro"
        loadAssest={loadAssest}
        name="cinematic-transition-intro-theme.mp3"
      />
      <Audio
        id="audio-match-strike"
        loadAssest={loadAssest}
        name="match-strike-sound-effect.mp3"
      />

      <Audio
        id="audio-fire"
        loadAssest={loadAssest}
        name="match-strike-sound-effect.mp3"
      />

      <Audio
        className="audio-wrong"
        loadAssest={loadAssest}
        name="sad-trumpet-sound.mp3"
      />

      <Audio
        className="audio-wrong"
        loadAssest={loadAssest}
        name="wah-wah-wah-sound-effect.mp3"
      />

      {/* <Img loadAssest={loadAssest} name="curtain-opening-first-frame.png" />
    <Img loadAssest={loadAssest} name="panda.svg" />      
    <Img loadAssest={loadAssest} name="curtain-opening.gif" /> */}
    </div>
  );
}

const mapDispatchToProps = {
  loadAssest: general.loadAssest,
};

export default connect(null, mapDispatchToProps)(PreloadAssests);
