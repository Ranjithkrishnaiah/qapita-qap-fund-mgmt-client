import * as React from "react";

const ArrowIcon: React.FC = (props) => (
  <svg
    width={35}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.287 22.703-4.256 4.256-4.256-4.256"
      stroke="#D7D7D7"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m1.712 13.258 4.256-4.256 4.257 4.256"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.03 26.961v-9.936"
      stroke="#D7D7D7"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.968 9v9.936"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path stroke="#333" d="M34.5 0v32" />
  </svg>
);

export default ArrowIcon;
