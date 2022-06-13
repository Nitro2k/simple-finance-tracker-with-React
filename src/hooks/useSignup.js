import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIspending] = useState(false)
  const { dispatch } = useAuthContext()
  const [isCancelled, setIsCencelled] = useState(false)

  const signup = async (email, password, displayName) => {
    setError(null)
    setIspending(true)

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!res) {
        throw new Error('Could not complete signup')
      }
      //add display name to user
      await res.user.updateProfile({ displayName: displayName })

      //dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      //update state
      if (!isCancelled) {
        setIspending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIspending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCencelled(true)
  }, [])

  return { error, isPending, signup }
}
