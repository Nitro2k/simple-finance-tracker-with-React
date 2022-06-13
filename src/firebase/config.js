import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCC4yOaKHADH3ErH5F2BtzzT3S4Xe4jVx0',
  authDomain: 'nomoney-433bd.firebaseapp.com',
  projectId: 'nomoney-433bd',
  storageBucket: 'nomoney-433bd.appspot.com',
  messagingSenderId: '547480499645',
  appId: '1:547480499645:web:2e62c1140ad8c535a50ed4',
}

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
