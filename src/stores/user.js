import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import db from '@/includes/firebase'
import 'firebase/firestore'

const auth = getAuth()
import { defineStore } from 'pinia'
export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(valuse) {
      const userCred = await createUserWithEmailAndPassword(auth, valuse.email, valuse.password)
      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: valuse.name,
        email: valuse.email,
        age: valuse.age,
        country: valuse.country,
      })

      await updateProfile(userCred.user, {
        displayName: valuse.name,
      })
      this.userLoggedIn = true
    },
    async auth(valuse) {
      await signInWithEmailAndPassword(auth, valuse.email, valuse.password)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    },
  },
})
