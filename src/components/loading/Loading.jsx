import React from 'react'
import loading from '../../assets/loader/loader.gif'

export default function Loading() {
  return (
    <div className='w-full mx-auto'><img className='loading' src={loading} /></div>
  )
}
