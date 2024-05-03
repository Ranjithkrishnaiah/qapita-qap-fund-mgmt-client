import * as React from "react";

const TrashIcon: React.FC = (props) => (
  <svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.667 3.37h10.667M9.963 12.851H4.036a1.187 1.187 0 0 1-1.184-1.184V3.37H4.63V2.185A1.187 1.187 0 0 1 5.814 1h2.37A1.187 1.187 0 0 1 9.37 2.185V3.37h1.778v8.297a1.187 1.187 0 0 1-1.185 1.184v0Z"
      stroke="#C4C4C4"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.815 6.334v3.555M8.187 6.334v3.555"
      stroke="#C4C4C4"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TrashIcon;
