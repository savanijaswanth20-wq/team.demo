import React from 'react'
import { GoogleIcon, GitHubIcon } from '../UI/Icons'

export const SocialButtons = ({ onSocialLogin, isLoading }) => {
  const providers = [
    { id: 'google', name: 'Google', icon: <GoogleIcon /> },
    { id: 'github', name: 'GitHub', icon: <GitHubIcon /> },
  ]

  return (
    <div className="social-login-section">
      <div className="social-divider">
        <span>or continue with</span>
      </div>
      <div className="social-grid">
        {providers.map((p) => (
          <button
            key={p.id}
            type="button"
            className="social-btn"
            onClick={() => onSocialLogin(p.name)}
            disabled={isLoading}
            title={`Sign in with ${p.name}`}
            aria-label={`Sign in with ${p.name}`}
          >
            {p.icon}
            <span className="social-btn-label">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SocialButtons
