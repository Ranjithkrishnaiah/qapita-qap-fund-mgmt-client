import * as React from "react";

const DeleteIcon: React.FC = (props) => (
  <svg
    width={19}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.12 5.4h12.21M12.616 17.666H5.832c-.36 0-.704-.162-.958-.449a1.642 1.642 0 0 1-.398-1.082V5.401H6.51V3.868c0-.406.143-.796.398-1.083.254-.288.599-.45.958-.45h2.714c.36 0 .704.163.958.45.254.287.397.677.398 1.083v1.533h2.035v10.734c0 .406-.144.795-.398 1.082a1.284 1.284 0 0 1-.958.449v0ZM7.867 9.234v4.6M10.58 9.234v4.6"
      stroke="#C4C4C4"
      strokeWidth={1.75}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DeleteIcon;
