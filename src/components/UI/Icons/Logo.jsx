import React from "react";

export default function Logo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path
        stroke="white"
        strokeWidth="1.5"
        d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
        opacity=".5"
      />
      <path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 15.8 7.143 17 10 14M6 8.8 7.143 10 10 7"
      />
      <path
        stroke="gray"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M13 9h5M13 16h5"
      />
    </svg>
  );
}
