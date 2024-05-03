import * as React from "react";

const ShareIcon: React.FC = (props) => (
  <svg
    width={17}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.871 6c1.222 0 2.212-1.12 2.212-2.5S14.093 1 12.871 1c-1.222 0-2.212 1.12-2.212 2.5S11.649 6 12.87 6ZM4.022 11.833c1.222 0 2.213-1.12 2.213-2.5s-.99-2.5-2.213-2.5c-1.221 0-2.212 1.12-2.212 2.5s.99 2.5 2.212 2.5ZM12.871 17.667c1.222 0 2.212-1.12 2.212-2.5s-.99-2.5-2.212-2.5c-1.222 0-2.212 1.12-2.212 2.5s.99 2.5 2.212 2.5ZM5.932 10.592l5.037 3.317M10.96 4.758 5.933 8.075"
      stroke="#633EA5"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShareIcon;
