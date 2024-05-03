import * as React from "react";

const DeclineIcon: React.FC = (props) => (
  <svg
    width={18}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.292 1.53c0-.842-.688-1.53-1.53-1.53H1.53C.69 0 0 .688 0 1.53v9.174c0 .841.688 1.53 1.53 1.53h12.233c.84 0 1.529-.688 1.529-1.53V1.53zm-1.53 0L7.647 5.351 1.529 1.53h12.234zm0 9.174H1.53V3.058l6.117 3.823 6.117-3.823v7.646z"
      fill="#B8B8B8"
    />
    <path
      d="M14.098 6.372a3.903 3.903 0 110 7.805 3.903 3.903 0 010-7.805z"
      fill="#FF5151"
    />
    <path
      d="M16 8l-4 4M12 8l4 4"
      stroke="#fff"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DeclineIcon;
