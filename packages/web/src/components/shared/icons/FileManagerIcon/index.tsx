import * as React from "react";

const FileManagerIcon: React.FC = (props) => (
  <svg
    width={26}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.114 2.993h-9.861L11.289.131a.3.3 0 0 0-.105-.098A.261.261 0 0 0 11.05 0H3.114c-.594.035-1.152.334-1.554.83a2.762 2.762 0 0 0-.59 1.825v17.5a2.76 2.76 0 0 0 .591 1.822c.401.496.96.794 1.553.83h19.998c.594-.036 1.151-.334 1.553-.83a2.76 2.76 0 0 0 .59-1.822V5.645a2.76 2.76 0 0 0-.59-1.823c-.401-.496-.959-.794-1.552-.829Z"
      fill="#633EA5"
    />
  </svg>
);

export default FileManagerIcon;
