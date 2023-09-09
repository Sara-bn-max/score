import React from 'react'

export default function ButtonFieldError({btnTxt,btnOnClick,btnType,className }) {
  return (
    <div className={className}>
        <button className="bg-secondary border-none outline-none text-center w-full py-2 font-bold text-white rounded-md m-2" type={btnType} onClick={btnOnClick} >{btnTxt}</button>
    </div>
  )
}
