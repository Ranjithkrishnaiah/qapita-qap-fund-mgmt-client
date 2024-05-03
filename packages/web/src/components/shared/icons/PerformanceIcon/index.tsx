import * as React from "react";

const PerformanceIcon: React.FC = (props) => (
  <svg
    width={15}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fillIcon"
      d="M0 0h4v10H2V2H0V0zm11.83 4.72L14.66 0h-2.33l-1.66 2.77L9 0H6.67L9.5 4.72 6.33 10h2.33l2-3.34 2 3.34H15l-3.17-5.28z"
      fill="#AE9BCF"
    />
  </svg>
);

export default PerformanceIcon;
