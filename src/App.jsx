import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import LoginForm from './components/Auth/LoginForm'
import ForgotPasswordModal from './components/Auth/ForgotPasswordModal'
import WelcomeDashboard from './components/Dashboard/WelcomeDashboard'
import Toast from './components/UI/Toast'
import './styles/auth.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('teamdemo_theme') || 'dark'
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('teamdemo_user')
    return saved ? JSON.parse(saved) : null
  })

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('teamdemo_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const showToast = (type, title, message) => {
    setToast({ type, title, message })
  }

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData)
    if (userData.rememberMe) {
      localStorage.setItem('teamdemo_user', JSON.stringify(userData))
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('teamdemo_user')
    showToast('info', 'Signed Out', 'You have been safely signed out.')
  }

  return (
    <div className="app-root-container">
      {/* Dynamic ambient lights & grid overlay */}
      <div className="bg-ambient-lights">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>
      <div className="bg-grid-overlay"></div>

      {/* Navigation Top Bar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Container */}
      <main className="auth-page-main">
        {currentUser ? (
          <WelcomeDashboard user={currentUser} onLogout={handleLogout} />
        ) : (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onOpenForgotPassword={() => setIsForgotModalOpen(true)}
            onNotify={showToast}
          />
        )}
      </main>

      {/* Forgot Password Flow Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        onNotify={showToast}
      />

      {/* Dynamic Toast Feedback Overlay */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}

export default App
