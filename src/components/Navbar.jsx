import React from 'react'
import { SunIcon, MoonIcon, SparklesIcon } from './UI/Icons'

export const Navbar = ({ theme, onToggleTheme }) => {
  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo-icon">
            <div className="logo-spark"></div>
            <span className="brand-letter">T</span>
          </div>
          <div className="brand-text-group">
            <span className="brand-name">Team<span className="brand-highlight">Demo</span></span>
            <span className="brand-badge">Enterprise</span>
          </div>
        </div>

        <nav className="navbar-links">
          <a
            href="https://github.com/savanijaswanth20-wq/team.demo"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            Repository
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault()
              alert('TeamDemo Enterprise Portal - Version 2.0 with Live Collaboration.')
            }}
            className="nav-link"
          >
            Features
          </a>
          <a
            href="#support"
            onClick={(e) => {
              e.preventDefault()
              alert('Need help? Contact support@teamdemo.io or check documentation.')
            }}
            className="nav-link"
          >
            Help & Support
          </a>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span className="theme-toggle-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
