import React from 'react'

const BackArrow = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E6007E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
}

export default BackArrow