import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import api from '../services/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadStorage() {
      const userStorage = localStorage.getItem('@AuthUser')
      const tokenStorage = localStorage.getItem('@AuthToken')

      if (userStorage && tokenStorage) {
        setUser(JSON.parse(userStorage))
        api.defaults.headers.Authorization = `Bearer ${tokenStorage}`
        try {
          const response = await api.get('/newtoken', {
            headers: {
              Authorization: `Bearer ${tokenStorage}`
            }
          })
          localStorage.setItem('@AuthToken', response.data.token)
        } catch (err) {
          console.log(err)
          setUser(null)
          localStorage.removeItem('@AuthUser')
          localStorage.removeItem('@AuthToken')
        }
      }
    }
    loadStorage()
  }, [])

  async function signIn(email, password) {
    try {
      const response = await api.post('/sessions', { email, password })
      toast.success('Login realizado com sucesso')
      const { user, token } = response.data

      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(user)

      localStorage.setItem('@AuthUser', JSON.stringify(user))
      localStorage.setItem('@AuthToken', token)
    } catch (error) {
      console.log(error)
      toast.error('Erro ao fazer login. E-mail ou senha inválidos')
    }
  }

  async function signOut() {
    localStorage.removeItem('@AuthUser')
    localStorage.removeItem('@AuthToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
