import * as React from "react";

const FrameIcon: React.FC = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.833 0H4.167A4.167 4.167 0 0 0 0 4.167v11.666A4.167 4.167 0 0 0 4.167 20h11.666A4.167 4.167 0 0 0 20 15.833V4.167A4.167 4.167 0 0 0 15.833 0Z"
      fill="#C4C4C4"
    />
    <path
      d="M14.227 15.422v-1.278a2.557 2.557 0 0 0-2.557-2.557H6.557A2.557 2.557 0 0 0 4 14.144v1.278M8.527 8.932a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM17.478 15.422v-1.278a2.557 2.557 0 0 0-1.918-2.474M13.004 4a2.557 2.557 0 0 1 0 4.954"
      stroke="#633EA5"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FrameIcon;
