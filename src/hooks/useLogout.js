import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCencelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIspending] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIspending(true)

    //sign the user out
    try {
      await projectAuth.signOut()

      //dispatch logout action
      dispatch({ type: 'LOGOUT' })

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
  return { logout, error, isPending }
}
