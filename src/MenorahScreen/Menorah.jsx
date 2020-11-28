import React from "react";
import { getImgUrl } from "../utils";

export default function Menorah(props) {
  const { backgroundSize, backgroundPosition } = props;
  return (
    <div
      id="menorah"
      className="layer"
      style={{
        zIndex: 0,
        backgroundSize,
        backgroundRepeat: "no-repeat",
        backgroundPosition,
        backgroundImage: `url(${getImgUrl("menorah.png")})`,
      }}
    />
  );
}
