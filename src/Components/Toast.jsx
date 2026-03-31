import React from 'react'

function Toast({ toastMessage, toastType = 'info' }) {
  const className = toastType === 'success'
    ? 'absolute p-2 bg-green-100 text-green-600 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur'
    : toastType === 'error'
      ? 'absolute p-2 bg-red-100 text-red-600 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur'
      : 'absolute p-2 bg-blue-100 text-blue-600 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur';

  return (
    <div className={className}>
      {toastMessage}
    </div>
  )
}

export default Toast
