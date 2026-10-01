import React, { useEffect } from 'react'
import { CheckIcon, AlertCircleIcon } from './Icons'

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onClose()
    }, 4500)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isSuccess = toast.type === 'success'
  const isError = toast.type === 'error'

  return (
    <div className={`toast-notification ${toast.type} animate-slide-in`}>
      <div className="toast-icon">
        {isSuccess && <CheckIcon />}
        {isError && <AlertCircleIcon />}
        {!isSuccess && !isError && <span className="toast-dot"></span>}
      </div>
      <div className="toast-content">
        <div className="toast-title">{toast.title || (isSuccess ? 'Success' : isError ? 'Error' : 'Notification')}</div>
        <div className="toast-message">{toast.message}</div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        &times;
      </button>
    </div>
  )
}

export default Toast
