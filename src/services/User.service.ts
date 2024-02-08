import { nanoid } from '@reduxjs/toolkit'
import { PHOTO_GUEST_URL } from 'constants/app.constants'
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from 'firebaseConfig/firebase'
import { TDataInput } from 'types/types'

export const UserService = {
	async SignUpUser({ username, password }: TDataInput) {
		try {
			const user = await createUserWithEmailAndPassword(
				auth,
				username,
				password
			)				
			await updateProfile(user.user, {
				photoURL: PHOTO_GUEST_URL,
				displayName: `${nanoid(12)}`
			})

			await setDoc(doc(db, 'users', user.user.uid), {
				uid: user.user.uid,
				username,
				photoURL: PHOTO_GUEST_URL,
				displayName: `${nanoid(12)}`
			})
			await setDoc(doc(db, 'userChats', user.user.uid), {})
		} catch (error) {
			throw new Error(error.code)
		}
	},

	async LogInUser({ username, password }: TDataInput) {
		try {
			await signInWithEmailAndPassword(auth, username, password)
		} catch (error) {
			throw new Error(error.code)
		}
	},

	async SignInGoogleUser() {
		try {
			const provider = new GoogleAuthProvider()
			const user = await signInWithPopup(auth, provider)

			const userChatsDocRef = doc(db, 'userChats', user.user.uid)
			const userChatsSnapshot = await getDoc(userChatsDocRef)

			if (!userChatsSnapshot.exists()) {
				await setDoc(doc(db, 'users', user.user.uid), {
					uid: user.user.uid,
					username: user.user.email,
					photoURL: user.user.photoURL ? user.user.photoURL : PHOTO_GUEST_URL,
					displayName: user.user.displayName ||`${nanoid(12)}`

				})
				await setDoc(userChatsDocRef, {})
			}
		} catch (error) {
			throw new Error(error.code)
		}
	}
}
