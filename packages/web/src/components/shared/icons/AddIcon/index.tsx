import * as React from "react";

const AddIcon: React.FC = (props) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="fillIcon"
      d="M20 0C8.96 0 0 8.96 0 20s8.96 20 20 20 20-8.96 20-20S31.04 0 20 0zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
      fill="#633EA5"
    />
  </svg>
);

export default AddIcon;
