import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../firebase/initFirebase'
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'
import User from '../models/user'

initFirebase()

const initialState: User = {
  id: '',
  email: '',
  token: '',
  name: '',
  profilePic: '',
  placeID: '',
  reviews: [],
}

const useUser = () => {
  const [user, setUser] = useState<User>(initialState)
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user)
        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser({ ...initialState })
      }
    })

    const userFromCookie = getUserFromCookie()

    if (!userFromCookie) {
      // router.push("/");
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, logout }
}

export default useUser
