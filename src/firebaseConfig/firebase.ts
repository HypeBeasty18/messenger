import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";

const app = initializeApp({
	apiKey: 'AIzaSyDYFIAMrRtrqrSQiUcM8EIPix_Qc5hOOgg',
	authDomain: 'messenger-f3a90.firebaseapp.com',
	projectId: 'messenger-f3a90',
	storageBucket: 'messenger-f3a90.appspot.com',
	messagingSenderId: '1079197911699',
	appId: '1:1079197911699:web:bc2cd158c3edb8cbbc1b66',
	measurementId: 'G-2M49WTQ3VJ'
})

export const auth = getAuth(app)

export default app