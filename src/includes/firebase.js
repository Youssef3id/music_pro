import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCjHzXYwoj9xJ0cYRzNV7m-gkpPEI23eyE',
  authDomain: 'music-6ba77.firebaseapp.com',
  projectId: 'music-6ba77',
  storageBucket: 'music-6ba77.firebasestorage.app',
  messagingSenderId: '778702507671',
  appId: '1:778702507671:web:7dfd5e026c0d776be723d2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export default db
export { storage }
