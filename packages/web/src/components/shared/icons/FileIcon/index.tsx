import * as React from "react";

const FileIcon: React.FC = (props) => (
  <svg
    width={24}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.881 2.617h-9.744L10.197.115A.285.285 0 0 0 9.96 0H2.119A2.237 2.237 0 0 0 .002 2.322v15.301a2.236 2.236 0 0 0 2.117 2.318h19.762a2.236 2.236 0 0 0 2.117-2.318V4.935a2.236 2.236 0 0 0-2.117-2.318Z"
      fill="#C4C4C4"
    />
  </svg>
);

export default FileIcon;
