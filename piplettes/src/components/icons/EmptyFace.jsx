import React from 'react'

const EmptyFace = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E6007E"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-mood-empty"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9 15l6 0" />
    </svg>
  );
}

export default EmptyFace