import React from 'react'

const Button = ({text, icon}) => {
  return (
    <div className="bg-transparent border-2 border-orangy-600 text-orangy-600 w-max p-2 mt-2 hover:text-greeny-600 transition duration-300 hover:scale-105 hover:border-greeny-600 cursor-pointer flex items-center justify-center font-semibold">
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </div>
  );
}

export default Button