import {
  getAuth,
  type AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User as AuthUser
} from 'firebase/auth'
import moment from 'moment'
import { redirect } from 'react-router-dom'
import { firebase } from '../../config'

interface User {
  email: string
  password: string
  phoneNumber?: string
  photoURL?: string
}

const auth = getAuth()

const createNewUser = async ({ email, password }: User): Promise<any> => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)

  return user
}

const loginUser = async ({ email, password }: User): Promise<any> => {
  const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)

  return user
}

const logoutUser = async (): Promise<any> => {
  await signOut(auth)
    .then((response) => {
      console.log(response)
      redirect('/user/login')
    })
    .catch((error) => {
      console.error(error)
    })
}

const checkUserSession = async (sessionTime: string | undefined): Promise<any> => {
  if (sessionTime != null) {
    const now = moment()
    const signInSince = moment(sessionTime)
    const duration = moment.duration(now.diff(signInSince))
    if (duration.asHours() > 10) {
      void logoutUser()
    }
  }
}

onAuthStateChanged(auth, (user: AuthUser | null) => {
  if (user != null) {
    console.log('current user', user.toJSON())
    void checkUserSession(user.metadata.lastSignInTime)
  } else {
    console.log('no logged user')
  }
})

const user = firebase.auth().currentUser

export {
  createNewUser,
  loginUser,
  checkUserSession,
  logoutUser,
  auth,
  user as CurrentUser,
  type User as UserInterface,
  type AuthError
}
