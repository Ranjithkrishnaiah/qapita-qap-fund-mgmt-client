import * as React from "react";

const UserIcon: React.FC = (props) => (
  <svg
    className="strokeIcon"
    width={19}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="strokeIcon"
      d="M17.771 19v-2c0-1.06-.42-2.078-1.171-2.828A4.013 4.013 0 0013.766 13H5.754a4.013 4.013 0 00-2.834 1.172A3.996 3.996 0 001.748 17v2M9.76 9a4.002 4.002 0 004.006-4c0-2.21-1.793-4-4.006-4a4.002 4.002 0 00-4.006 4c0 2.21 1.793 4 4.006 4z"
      stroke="#633EA5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UserIcon;
