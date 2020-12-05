import "./credits.scss";
import React from "react";
import classNames from "classnames";
import CREDITS, { TYPES } from "./credits";

const Credit = (props) => {
  const { type } = props;
  const { credits, title } = CREDITS[type];
  let names = new Set([...credits.map((credit) => credit.authorName)]);
  names = [...names].join(", ").split(names.length);

  const top = (window.innerHeight / 3) * (2 / 3);
  const left = window.innerWidth / 3 / 2;

  return (
    <div
      style={{
        top,
        left,
      }}
      className={classNames("credit", type)}
    >
      <h1 className="credit-header">{title}</h1>
      <h1 className="credit-names">{names}</h1>
    </div>
  );
};

const Header = () => {
  const top = (window.innerHeight / 3) * (1 / 10);
  const left = window.innerWidth / 3 / 2;

  return (
    <h1
      className="main-header"
      style={{
        top,
        left,
      }}
    >
      <span className='text'>Hanukkah</span>
      <span className='year'>2020</span>
    </h1>
  );
};

// const Presents = props => {
//   const top = (window.innerHeight / 3) * (1 / 10);
//   const left = window.innerWidth / 3 / 2;

//   return (
//     <div
//       style={{
//         top,
//         left,
//       }}
//       className={classNames("credit")}
//     >
//       <h1 className="credit-header">Produced by</h1>
//       <h1 className="credit-names">Liran Reuven</h1>
//     </div>
//   );
// }

export default function Credits(props) {
  return (
    <div className="credits-start">
      <Header />
      <Credit type={TYPES.PRODUCTION} />
      <Credit type={TYPES.SOUNDS} />
      <Credit type={TYPES.IMAGES} />
      <Credit type={TYPES.FONTS} />
    </div>
  );
}
