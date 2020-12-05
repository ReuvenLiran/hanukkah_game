import React from 'react'
import './moon.scss';

const DIAMETER = 200;

export default function Moon (props) {
  const { globalRatio } = props;
    const left = window.innerWidth / 3 / 2 - (globalRatio * DIAMETER / 2);
    const top = window.innerHeight / 3 / 2 - (globalRatio * DIAMETER / 2);
    return (<div className="moon"
      style={{
        height: globalRatio * DIAMETER,
        width: globalRatio * DIAMETER,
        left,
        top
        // top: globalRatio * 150,
      }}
    >
    <div className="craters"></div>
  </div>)
}