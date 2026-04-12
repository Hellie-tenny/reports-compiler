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

  return (
    <div className={`absolute p-2 rounded-xl fixed top-4 left-1/2 z-50 -translate-x-1/2 shadow-xl backdrop-blur transition-opacity duration-300 ${toastClasses} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {toastMessage}
    </div>
  )
}
