import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

interface User {
  email: string
  password: string
}

const auth = getAuth()

const createNewUser = async ({ email, password }: User): Promise<any> => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => error)

  return user
}

const loginUser = async ({ email, password }: User): Promise<any> => {
  const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => error)

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
  type User as UserInterface
}
