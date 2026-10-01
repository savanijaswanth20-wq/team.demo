import React, { useState } from 'react'
import { MailIcon, CheckIcon, AlertCircleIcon, LockIcon } from '../UI/Icons'

export const ForgotPasswordModal = ({ isOpen, onClose, onNotify }) => {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('input') // 'input' | 'sent' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSendLink = (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      onNotify('error', 'Invalid Email', 'Please provide a valid email address.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStep('sent')
      onNotify('success', 'Reset Code Sent', `A 6-digit recovery code was sent to ${email}`)
    }, 1200)
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1)
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) {
      onNotify('error', 'Incomplete Code', 'Please enter the 6-digit verification code.')
      return
    }
    if (newPassword.length < 8) {
      onNotify('error', 'Weak Password', 'New password must be at least 8 characters.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onNotify('success', 'Password Updated!', 'You can now sign in with your new password.')
      handleClose()
    }, 1200)
  }

  const handleClose = () => {
    setEmail('')
    setStep('input')
    setOtp(['', '', '', '', '', ''])
    setNewPassword('')
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="modal-backdrop animate-fade-in" onClick={handleClose}>
      <div className="modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>

        {step === 'input' && (
          <div>
            <div className="modal-icon-badge">
              <LockIcon />
            </div>
            <h3 className="modal-title">Reset your password</h3>
            <p className="modal-subtitle">
              Enter the email address associated with your account and we’ll send you a recovery code.
            </p>

            <form onSubmit={handleSendLink} className="modal-form">
              <div className="form-group">
                <label htmlFor="reset-email" className="form-label">Work Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <MailIcon />
                  </span>
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-spinner"></span>
                      Sending Code...
                    </>
                  ) : (
                    'Send Recovery Code'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'sent' && (
          <div>
            <div className="modal-icon-badge success">
              <CheckIcon />
            </div>
            <h3 className="modal-title">Enter Verification Code</h3>
            <p className="modal-subtitle">
              We sent a 6-digit code to <strong>{email}</strong>. (Hint: Try entering <code>1 2 3 4 5 6</code>)
            </p>

            <form onSubmit={handleResetPassword} className="modal-form">
              <div className="form-group">
                <label className="form-label">6-Digit Code</label>
                <div className="otp-container">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="otp-box"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-new-pwd" className="form-label">New Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <LockIcon />
                  </span>
                  <input
                    id="modal-new-pwd"
                    type="password"
                    placeholder="At least 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep('input')}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-spinner"></span>
                      Resetting...
                    </>
                  ) : (
                    'Save New Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordModal
