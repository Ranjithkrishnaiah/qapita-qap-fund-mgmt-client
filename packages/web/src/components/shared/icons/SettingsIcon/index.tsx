import * as React from "react";

const SettingsIcon: React.FC = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="strokeIcon"
      clipRule="evenodd"
      d="M10.001 12.467a2.466 2.466 0 100-4.932 2.466 2.466 0 000 4.932z"
      stroke="#AE9BCF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className="strokeIcon"
      clipRule="evenodd"
      d="M16.083 12.467a1.362 1.362 0 00.27 1.493l.05.05a1.646 1.646 0 01-1.158 2.826 1.646 1.646 0 01-1.168-.501l-.05-.05a1.367 1.367 0 00-2.317.97v.14a1.644 1.644 0 01-3.287 0v-.073a1.422 1.422 0 00-2.383-.97l-.05.05a1.644 1.644 0 11-2.325-2.326l.05-.05a1.367 1.367 0 00-.97-2.317h-.14a1.644 1.644 0 010-3.287h.073a1.423 1.423 0 00.97-2.383l-.05-.05a1.645 1.645 0 112.327-2.325l.05.05a1.355 1.355 0 001.493.271h.065a1.358 1.358 0 00.822-1.24v-.14a1.644 1.644 0 013.287 0v.073a1.366 1.366 0 002.317.97l.05-.05a1.645 1.645 0 112.325 2.326l-.05.05a1.362 1.362 0 00-.271 1.493v.065a1.355 1.355 0 001.24.822h.14a1.644 1.644 0 010 3.287h-.073a1.355 1.355 0 00-1.237.826z"
      stroke="#AE9BCF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SettingsIcon;
