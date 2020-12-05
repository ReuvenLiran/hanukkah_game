import React from "react";
import { getImgUrl } from "../utils";

export default function Menorah(props) {
  const { backgroundSize, backgroundPosition } = props;
  return (
    <div
      id="menorah"
      className="layer"
      style={{
        backgroundSize,
        backgroundRepeat: "no-repeat",
        backgroundPosition,
        backgroundImage: `url(${getImgUrl("menorah.png")})`,
      }}
    />
  );
}
