import React, { useEffect, useState } from 'react'

export default function Toast({toastMessage, toastType = 'default', toastCounter}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, toastCounter]);

  const toastClasses = toastType === 'success'
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    : 'bg-red-100 text-red-400';

<<<<<<< HEAD
  return (
    <div className={`absolute p-2 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur transition-opacity duration-300 ${toastClasses} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {toastMessage}
=======
function Toast({ toastMessage, toastType = 'info' }) {
  const className = toastType === 'success'
    ? 'absolute p-2 bg-green-100 text-green-600 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur'
    : toastType === 'error'
      ? 'absolute p-2 bg-red-100 text-red-600 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur'
      : 'absolute p-2 bg-blue-100 text-blue-600 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur';

  return (
    <div className={className}>
      {toastMessage}
>>>>>>> 80b62e768db65034db078ab34809749a13c26973
    </div>
  )
}

export default Toast
