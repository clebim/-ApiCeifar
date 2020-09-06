import React from 'react'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './contexts/AuthContext'
import GlobalStyles from './styles/globalStyles'
import Routes from './routes/index'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
        <ToastContainer autoClose={3000} />
        <GlobalStyles />
      </AuthProvider>
    </>
  )
}

export default App
