import * as React from "react";

const DownloadUserIcon: React.FC = (props) => (
  <svg
    width={15}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.315 5.25V3c0-.398.14-.78.389-1.061.249-.282.587-.44.939-.44h9.29c.352 0 .69.158.939.44.249.281.389.663.389 1.06v2.25M9.942 13.5l-2.654 2.999-2.656-3"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.288 6v10.5"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </svg>
);

export default DownloadUserIcon;
