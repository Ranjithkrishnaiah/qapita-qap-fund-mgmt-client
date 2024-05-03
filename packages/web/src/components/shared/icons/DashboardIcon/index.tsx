import * as React from "react";

const DashboardIcon: React.FC = (props) => (
  <svg
    width={18}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="strokeIcon"
      d="M16.556 8h-3.112l-2.333 7L6.444 1 4.111 8H1"
      stroke="#AE9BCF"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DashboardIcon;
