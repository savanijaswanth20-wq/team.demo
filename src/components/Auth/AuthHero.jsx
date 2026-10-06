import React from 'react'
import { SparklesIcon, ShieldCheckIcon, CheckIcon } from '../UI/Icons'

export const AuthHero = () => {
  return (
    <div className="auth-hero-panel">
      {/* Ambient background decoration */}
      <div className="hero-glow-sphere sphere-1"></div>
      <div className="hero-glow-sphere sphere-2"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <SparklesIcon />
          <span>Next-Gen Team Platform 2026</span>
        </div>

        <h1 className="hero-title">
          Build together, <br />
          <span className="text-gradient">ship at the speed of light.</span>
        </h1>

        <p className="hero-description">
          The unified cloud workspace for agile teams, engineers, and product designers. Seamless security, lightning-fast collaboration.
        </p>

        {/* Feature Highlights */}
        <div className="hero-feature-list">
          <div className="hero-feature-item">
            <div className="feature-icon-wrapper">
              <ShieldCheckIcon />
            </div>
            <div>
              <h4 className="feature-title">SOC-2 & Zero-Trust Security</h4>
              <p className="feature-desc">End-to-end encrypted sessions with multi-factor SSO.</p>
            </div>
          </div>
        </div>

        {/* Social Proof / Stats Box */}
        <div className="hero-social-proof">
          <div className="avatar-stack">
            <div className="avatar av-1">JD</div>
            <div className="avatar av-2">AK</div>
            <div className="avatar av-3">SR</div>
            <div className="avatar av-4">+4k</div>
          </div>
          <div className="proof-text">
            <div className="proof-stars">★★★★★</div>
            <div className="proof-sub">Trusted by 10,000+ top engineering teams</div>
          </div>
        </div>

        {/* Live system status pill */}
        <div className="live-status-pill">
          <span className="status-indicator-dot"></span>
          <span>All systems operational &bull; 99.99% uptime SLA</span>
        </div>
      </div>
    </div>
  )
}

export default AuthHero
