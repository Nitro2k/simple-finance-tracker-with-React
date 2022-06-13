import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCencelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIspending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIspending(true)

    //sign the user in
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

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
  return { login, error, isPending }
}
