import { getAuth, type AuthError, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

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

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log('current user', user)
  } else {
    console.log('no logged user')
  }
})

export {
  createNewUser,
  loginUser,
  type User as UserInterface,
  type AuthError
}
