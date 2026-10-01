import React from 'react'
import { CheckIcon } from '../UI/Icons'

export const PasswordStrengthMeter = ({ password }) => {
  if (!password) return null

  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains a number (0-9)', met: /[0-9]/.test(password) },
    { label: 'Contains special symbol (!@#$...)', met: /[^A-Za-z0-9]/.test(password) },
  ]

  const passedCount = checks.filter((c) => c.met).length

  let strengthLabel = 'Very Weak'
  let strengthColor = 'var(--strength-weak)'
  let strengthWidth = '20%'

  if (passedCount === 1) {
    strengthLabel = 'Weak'
    strengthColor = '#ef4444'
    strengthWidth = '25%'
  } else if (passedCount === 2) {
    strengthLabel = 'Fair'
    strengthColor = '#f59e0b'
    strengthWidth = '50%'
  } else if (passedCount === 3) {
    strengthLabel = 'Good'
    strengthColor = '#3b82f6'
    strengthWidth = '75%'
  } else if (passedCount === 4) {
    strengthLabel = 'Strong & Secure'
    strengthColor = '#10b981'
    strengthWidth = '100%'
  }

  return (
    <div className="password-strength-container animate-fade-in">
      <div className="strength-header">
        <span className="strength-text">Password Strength</span>
        <span className="strength-badge" style={{ color: strengthColor }}>
          {strengthLabel}
        </span>
      </div>
      <div className="strength-bar-track">
        <div
          className="strength-bar-fill"
          style={{ width: strengthWidth, backgroundColor: strengthColor }}
        ></div>
      </div>
      <div className="strength-checklist">
        {checks.map((c, idx) => (
          <div key={idx} className={`checklist-item ${c.met ? 'met' : 'unmet'}`}>
            <span className="checklist-icon">
              {c.met ? <CheckIcon /> : <span className="unmet-dot">•</span>}
            </span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
