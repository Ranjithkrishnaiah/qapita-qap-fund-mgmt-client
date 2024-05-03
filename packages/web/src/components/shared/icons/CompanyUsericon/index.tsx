import * as React from "react";

const CompanyUserIcon: React.FC = (props) => (
  <svg
    width={15}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.944 12.75V15c0 .398.14.78.389 1.061.249.282.587.44.939.44h9.29c.352 0 .69-.158.939-.44.249-.281.389-.663.389-1.06v-2.25M10.57 4.5L7.918 1.502l-2.656 3"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.917 12V1.5"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </svg>
);

export default CompanyUserIcon;
