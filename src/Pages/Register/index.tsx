import React, { useEffect } from 'react'
import * as firebaseui from 'firebaseui'

import { firebase } from '../../firebase/config'
import Div from '../../components/Div'

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth())

const Register = (): any => {
  useEffect(() => {
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    })
  }, [])

  return (
    <Div id="firebaseui-auth-container"></Div>
  )
}

export default Register
