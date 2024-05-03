import * as React from "react";

const CaptableIcon: React.FC = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
    <g
      data-name="Group 8347"
      fill="none"
      stroke="#ae9bcf"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
    >
      <path
        className="strokeIcon"
        data-name="Path 5022"
        d="M13 1H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2z"
      />
      <path className="strokeIcon" data-name="Path 5023" d="M1 8h14" />
      <path className="strokeIcon" data-name="Path 5024" d="M8 15V1" />
    </g>
  </svg>
);

export default CaptableIcon;
