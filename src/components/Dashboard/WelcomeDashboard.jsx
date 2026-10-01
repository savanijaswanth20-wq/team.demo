import React from 'react'
import { LogOutIcon, SparklesIcon, CheckIcon, ShieldCheckIcon } from '../UI/Icons'

export const WelcomeDashboard = ({ user, onLogout }) => {
  const stats = [
    { label: 'Active Projects', value: '14', change: '+2 this week', icon: '📁' },
    { label: 'Team Velocity', value: '98.4%', change: 'Top 5% speed', icon: '⚡' },
    { label: 'Security Score', value: '100 A+', change: 'All checks passed', icon: '🛡️' },
    { label: 'Cloud Resources', value: '32 Nodes', change: 'US-East-1 Active', icon: '☁️' },
  ]

  const teamMembers = [
    { name: 'Sarah Connor', role: 'DevOps Lead', status: 'online', avatar: 'SC' },
    { name: 'Alex Rivera', role: 'Frontend Engineer', status: 'online', avatar: 'AR' },
    { name: 'David Kim', role: 'Security Ops', status: 'in-meeting', avatar: 'DK' },
    { name: 'Elena Rostova', role: 'Product Manager', status: 'offline', avatar: 'ER' },
  ]

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Welcome Banner */}
      <div className="dashboard-banner">
        <div className="banner-user-info">
          <div className="user-avatar-large">
            {user.name ? user.name.slice(0, 2).toUpperCase() : 'TD'}
          </div>
          <div>
            <div className="banner-greeting">
              <span>Welcome back, </span>
              <strong>{user.name || user.email.split('@')[0]}</strong>! 👋
            </div>
            <p className="banner-subtitle">
              Logged in as <code className="user-email-tag">{user.email}</code> &bull; Role: <span className="badge-role">{user.role || 'Administrator'}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-danger-soft logout-button"
          onClick={onLogout}
        >
          <LogOutIcon />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="dashboard-grid">
        {stats.map((item, idx) => (
          <div key={idx} className="dashboard-card stat-card">
            <div className="stat-icon-wrapper">{item.icon}</div>
            <div className="stat-content">
              <span className="stat-label">{item.label}</span>
              <div className="stat-value">{item.value}</div>
              <span className="stat-change">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="dashboard-columns">
        {/* Workspace Quick Launch */}
        <div className="dashboard-card col-main">
          <div className="card-header">
            <div>
              <h3 className="card-title">Quick Workspace Launcher</h3>
              <p className="card-sub">Jump into your active workspaces and tools</p>
            </div>
            <span className="status-badge-active">
              <span className="pulse-dot"></span> Online
            </span>
          </div>

          <div className="quick-actions-grid">
            <button
              className="quick-action-btn"
              onClick={() => alert('Launching Team Collaboration Board...')}
            >
              <span className="qa-icon">🚀</span>
              <div className="qa-text">
                <strong>Sprint Kanban</strong>
                <span>8 tasks in progress</span>
              </div>
            </button>

            <button
              className="quick-action-btn"
              onClick={() => alert('Opening Cloud Terminal...')}
            >
              <span className="qa-icon">💻</span>
              <div className="qa-text">
                <strong>Cloud IDE Terminal</strong>
                <span>Connected to staging</span>
              </div>
            </button>

            <button
              className="quick-action-btn"
              onClick={() => alert('Opening Team Repositories...')}
            >
              <span className="qa-icon">📦</span>
              <div className="qa-text">
                <strong>Git Repositories</strong>
                <span>team.demo main branch</span>
              </div>
            </button>

            <button
              className="quick-action-btn"
              onClick={() => alert('Opening Security Audit logs...')}
            >
              <span className="qa-icon">🔒</span>
              <div className="qa-text">
                <strong>Audit & Security</strong>
                <span>Zero threats detected</span>
              </div>
            </button>
          </div>
        </div>

        {/* Team Activity Panel */}
        <div className="dashboard-card col-side">
          <div className="card-header">
            <h3 className="card-title">Active Team</h3>
            <span className="badge-count">4 Members</span>
          </div>

          <div className="team-list">
            {teamMembers.map((m, idx) => (
              <div key={idx} className="team-item">
                <div className="team-avatar">
                  {m.avatar}
                  <span className={`status-bubble ${m.status}`}></span>
                </div>
                <div className="team-details">
                  <span className="member-name">{m.name}</span>
                  <span className="member-role">{m.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card-footer-action">
            <button
              className="btn btn-secondary-full"
              onClick={() => alert('Invite link copied to clipboard!')}
            >
              + Invite Colleague
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeDashboard
