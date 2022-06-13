import { useReducer, useEffect, useState } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}
const fiestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      }
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(fiestoreReducer, initialState)
  const [isCancelled, setIsCencelled] = useState(false)

  //collection ref
  const ref = projectFirestore.collection(collection)

  //only dispatch is not cancelled
  const dispatchIsNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createAt })
      dispatchIsNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIsNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  //delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      await ref.doc(id).delete()
      dispatchIsNotCancelled({
        type: 'DELETED_DOCUMENT',
      })
    } catch (err) {
      dispatchIsNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  useEffect(() => {
    return () => setIsCencelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
