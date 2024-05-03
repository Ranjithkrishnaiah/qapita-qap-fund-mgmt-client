import * as React from "react";

const AcceptedIcon: React.FC = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z" fill="#1AB84F" />
    <path
      d="m12.57 4.57-6.284 6.286-2.858-2.858"
      stroke="#fff"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AcceptedIcon;
