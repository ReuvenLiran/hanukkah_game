import "./style.scss";
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

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
  return (
    <div
      id="theater"
      style={{
        display: hide ? "none" : "block",
      }}
      className={classNames({
        open: isOpen,
      })}
    >
      <em id="curtain-left"></em>
      <em id="curtain-right"></em>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isOpen: state.general.isTheaterCurtainOpen,
});

export default connect(mapStateToProps)(TheaterCurtain);
