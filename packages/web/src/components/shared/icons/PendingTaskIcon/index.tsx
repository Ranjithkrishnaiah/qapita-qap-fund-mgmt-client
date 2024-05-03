import * as React from "react";

const PendingTaskIcon: React.FC = (props) => (
  <svg
    width={18}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.429 1.543C15.429.694 14.734 0 13.886 0H1.543C.694 0 0 .694 0 1.543V10.8c0 .849.694 1.543 1.543 1.543h12.343c.848 0 1.543-.694 1.543-1.543V1.543zm-1.543 0L7.714 5.4 1.543 1.543h12.343zm0 9.257H1.543V3.086l6.171 3.857 6.172-3.857V10.8z"
      fill="#B8B8B8"
    />
    <path
      d="M14.143 6.429a3.857 3.857 0 110 7.714 3.857 3.857 0 010-7.714z"
      fill="#1AB84F"
    />
    <path
      d="M16.347 8.632l-3.03 3.03-1.378-1.377"
      stroke="#fff"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PendingTaskIcon;
