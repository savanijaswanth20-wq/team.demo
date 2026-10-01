import React, { useState } from 'react'
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  AlertCircleIcon,
  CheckIcon,
} from '../UI/Icons'
import SocialButtons from './SocialButtons'
import PasswordStrengthMeter from './PasswordStrengthMeter'

export const LoginForm = ({ onLoginSuccess, onOpenForgotPassword, onNotify }) => {
  const [tab, setTab] = useState('signin') // 'signin' | 'signup' | 'magiclink'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [acceptTerms, setAcceptTerms] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [shakeForm, setShakeForm] = useState(false)

  // Demo accounts for instant 1-click evaluation
  const demoAccounts = [
    { label: 'Demo Admin', email: 'admin@teamdemo.io', password: 'AdminSecret@2026', name: 'Devon Vance (Admin)', role: 'Enterprise Admin' },
    { label: 'Demo Engineer', email: 'alex@teamdemo.io', password: 'EngineerPass@2026', name: 'Alex Rivera', role: 'Staff Engineer' },
  ]

  const fillDemoAccount = (demo) => {
    setEmail(demo.email)
    setPassword(demo.password)
    setFullName(demo.name)
    setTab('signin')
    setErrorMessage('')
    onNotify('info', 'Demo Loaded', `Auto-filled credentials for ${demo.label}. Click "Sign In" or launch directly!`)
  }

  const triggerShake = () => {
    setShakeForm(true)
    setTimeout(() => setShakeForm(false), 600)
  }

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email || !validateEmail(email)) {
      setErrorMessage('Please enter a valid work email address.')
      triggerShake()
      onNotify('error', 'Validation Error', 'Please enter a valid email address.')
      return
    }

    if (tab === 'magiclink') {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        onNotify('success', 'Magic Link Sent! ✨', `A secure login link was emailed to ${email}. Check your inbox.`)
      }, 1500)
      return
    }

    if (!password) {
      setErrorMessage('Please enter your password.')
      triggerShake()
      return
    }

    if (tab === 'signup') {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.')
        triggerShake()
        return
      }
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters.')
        triggerShake()
        return
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify.')
        triggerShake()
        return
      }
      if (!acceptTerms) {
        setErrorMessage('Please agree to the Terms of Service to continue.')
        triggerShake()
        return
      }
    }

    setIsLoading(true)

    // Simulate authentication API latency
    setTimeout(() => {
      setIsLoading(false)

      // Check for intentional test failure (e.g. invalid password example)
      if (password === 'wrong') {
        setErrorMessage('Invalid credentials. Password does not match our records.')
        triggerShake()
        onNotify('error', 'Login Failed', 'Incorrect password. Try using Demo Accounts.')
        return
      }

      const userName = fullName || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1))
      const userRole = email.includes('admin') ? 'Enterprise Admin' : 'Full Stack Developer'

      onNotify('success', 'Authentication Successful', `Welcome to TeamDemo, ${userName}!`)
      onLoginSuccess({
        email,
        name: userName,
        role: userRole,
        rememberMe,
      })
    }, 1400)
  }

  const handleSocialAuth = (providerName) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const mockName = `${providerName} Member`
      onNotify('success', 'SSO Verified', `Successfully authenticated via ${providerName}!`)
      onLoginSuccess({
        email: `user@${providerName.toLowerCase()}.example`,
        name: mockName,
        role: 'Verified SSO User',
        provider: providerName,
      })
    }, 1200)
  }

  return (
    <div className={`auth-card-wrapper ${shakeForm ? 'shake-animation' : ''}`}>
      <div className="auth-card">
        {/* Header with Switcher Tabs */}
        <div className="auth-card-header">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${tab === 'signin' ? 'active' : ''}`}
              onClick={() => {
                setTab('signin')
                setErrorMessage('')
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setTab('signup')
                setErrorMessage('')
              }}
            >
              Register
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${tab === 'magiclink' ? 'active' : ''}`}
              onClick={() => {
                setTab('magiclink')
                setErrorMessage('')
              }}
            >
              Magic Link
            </button>
          </div>

          <h2 className="auth-title">
            {tab === 'signin' && 'Sign in to your account'}
            {tab === 'signup' && 'Create your team account'}
            {tab === 'magiclink' && 'Sign in with Magic Link'}
          </h2>
          <p className="auth-subtitle">
            {tab === 'signin' && 'Welcome back! Please enter your details.'}
            {tab === 'signup' && 'Start your 14-day enterprise trial. No credit card required.'}
            {tab === 'magiclink' && 'We’ll email you a password-free, one-click login link.'}
          </p>
        </div>

        {/* Quick Demo Fill Pill Bar */}
        <div className="demo-credentials-bar">
          <span className="demo-tag">Quick Demo:</span>
          {demoAccounts.map((d, i) => (
            <button
              key={i}
              type="button"
              className="demo-pill-btn"
              onClick={() => fillDemoAccount(d)}
              title={`Click to fill ${d.email}`}
            >
              <SparklesIcon />
              <span>{d.label}</span>
            </button>
          ))}
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircleIcon />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Authentication Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name for Registration */}
          {tab === 'signup' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="reg-name" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <UserIcon />
                </span>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="e.g. Jaswanth Savani"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>
          )}

          {/* Email input */}
          <div className="form-group">
            <label htmlFor="auth-email" className="form-label">Work Email</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                id="auth-email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                className="form-input"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password input (Sign In & Sign Up only) */}
          {tab !== 'magiclink' && (
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="auth-password" className="form-label">Password</label>
                {tab === 'signin' && (
                  <button
                    type="button"
                    className="forgot-link-btn"
                    onClick={onOpenForgotPassword}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="input-wrapper">
                <span className="input-icon">
                  <LockIcon />
                </span>
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errorMessage) setErrorMessage('')
                  }}
                  className="form-input input-with-toggle"
                  required
                  autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>

              {/* Password Strength Indicator for Registration */}
              {tab === 'signup' && <PasswordStrengthMeter password={password} />}
            </div>
          )}

          {/* Confirm Password (Registration only) */}
          {tab === 'signup' && (
            <div className="form-group animate-slide-down">
              <label htmlFor="reg-confirm-password" className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <LockIcon />
                </span>
                <input
                  id="reg-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {/* Checkboxes Row */}
          {tab === 'signin' && (
            <div className="form-options-row">
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="custom-checkbox-input"
                />
                <span className="checkbox-custom-box">
                  {rememberMe && <CheckIcon />}
                </span>
                <span className="checkbox-text">Remember this device for 30 days</span>
              </label>
            </div>
          )}

          {tab === 'signup' && (
            <div className="form-options-row">
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="custom-checkbox-input"
                  required
                />
                <span className="checkbox-custom-box">
                  {acceptTerms && <CheckIcon />}
                </span>
                <span className="checkbox-text">
                  I agree to the <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Standard Enterprise SLA & Privacy Agreement.'); }}>Terms of Service</a> & <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: End-to-end encrypted zero-retention data policies.'); }}>Privacy Policy</a>
                </span>
              </label>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            className="btn btn-primary btn-submit-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                <span>
                  {tab === 'signin' && 'Authenticating...'}
                  {tab === 'signup' && 'Creating Account...'}
                  {tab === 'magiclink' && 'Sending Magic Link...'}
                </span>
              </>
            ) : (
              <>
                <span>
                  {tab === 'signin' && 'Sign In to Workspace'}
                  {tab === 'signup' && 'Get Started Free'}
                  {tab === 'magiclink' && 'Send Instant Magic Link'}
                </span>
                <ArrowRightIcon />
              </>
            )}
          </button>
        </form>

        {/* Social Authentication */}
        <SocialButtons onSocialLogin={handleSocialAuth} isLoading={isLoading} />

        {/* Footer info */}
        <div className="auth-card-footer">
          <ShieldCheckIcon />
          <span>256-bit TLS Encrypted &bull; ISO-27001 Certified &bull; GDPR Ready</span>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
