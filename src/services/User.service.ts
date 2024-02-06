import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth'
import { auth } from 'firebaseConfig/firebase'
import { TDataInput } from 'types/types'

export const UserService = {
	async SignUpUser({ username, password }: TDataInput) {
		try {
			await createUserWithEmailAndPassword(auth, username, password)
		} catch (error) {
			console.log(error)
		}
	},

	async LogInUser({ username, password }: TDataInput) {
		try {
			await signInWithEmailAndPassword(auth, username, password)
		} catch (error) {
			console.log(error)
		}
	},

	async SignInGoogleUser() {
		try {
			const provider = new GoogleAuthProvider()
			await signInWithPopup(auth, provider)
		} catch (error) {
			console.log(error)
		}
	}
}
