import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()

const createNewUser = async (email: string, password: string): Promise<any> => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      console.log('error', error)
    })

  return user
}

const loginUser = async (email: string, password: string): Promise<any> => {
  const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      console.log('error', error)
    })

  return user
}

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log('current user', user)
  } else {
    console.log('signed out')
  }
})

export {
  createNewUser,
  loginUser
}
