import * as React from "react";

const FilterIcon: React.FC = (props) => (
  <svg
    width={18}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="strokeIcon"
      d="M17 1H1l6.4 7.568V13.8l3.2 1.6V8.568L17 1z"
      stroke="#633EA5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FilterIcon;
