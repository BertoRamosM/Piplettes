import React from 'react'

const Button = ({text}) => {
  return (
    <div className='bg-transparent border-2 border-orangy-600 text-orangy-600 w-max p-2 mt-2 hover:text-greeny-600'>
      {text}
    </div>
  )
}

export default Button