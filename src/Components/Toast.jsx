import React from 'react'

export default function ({toastMessage}) {
  return (
    <div className={`absolute p-2 bg-red-100 text-red-400 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur`}>
        {toastMessage}
    </div>
  )
}
