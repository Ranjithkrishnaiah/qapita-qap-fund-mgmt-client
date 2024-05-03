import * as React from "react";

const UploadIcon: React.FC = (props) => (
  <svg
    width={18}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.25 16.02v2.25a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5v-2.25M11.999 7.77l-3-3-3 3"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.999 15.27V4.77"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </svg>
);

export default UploadIcon;
