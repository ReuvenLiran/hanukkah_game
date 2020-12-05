import "./style.scss";
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { getImgUrl } from '../utils'

const createWord = (text) => {
  return text.split("").map((letter) => {
    return <span className="word">{letter}</span>;
  });
};

{
  /* <h1 className="header">
{createWord("Happy Hanukkah!")}
</h1> */
}

function TheaterCurtain(props) {
  const { isOpen, hide } = props;
  const img = isOpen ? "curtain-opening.gif" : "curtain-opening-first-frame.png";
  return (
    <div
      id="theater"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${getImgUrl(img)})`,
        display: hide ? "none" : "block",
      }}
      // className={classNames({
      //   open: isOpen,
      // })}
    >
      {/* <em id="curtain-left"></em>
      <em id="curtain-right"></em> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isOpen: state.general.isTheaterCurtainOpen,
});

export default connect(mapStateToProps)(TheaterCurtain);
