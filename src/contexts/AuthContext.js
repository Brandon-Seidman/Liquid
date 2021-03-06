import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signupauth(email,password){
    console.log("hello!")
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function loginauth(email,password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logoutauth(){
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
      currentUser,
      loginauth,
      signupauth,
      logoutauth
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
