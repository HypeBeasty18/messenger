import {
	DocumentData,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc
} from 'firebase/firestore'
import { auth, db } from 'firebaseConfig/firebase'
import { useMemo } from 'react'

interface Props {
	setValue: React.Dispatch<React.SetStateAction<string>>
	user: DocumentData
}
export const usePopUpSearch = ({ user, setValue }: Props) => {
	const handleClick = async () => {
		if (auth.currentUser?.uid) {
			const combinedId =
				auth.currentUser?.uid > user.uid
					? auth.currentUser?.uid + user.uid
					: user.uid + auth.currentUser?.uid
			try {
				const res = await getDoc(doc(db, 'chats', combinedId))
				if (!res.exists()) {
					await setDoc(doc(db, 'chats', combinedId), { messages: [] })

					await updateDoc(doc(db, 'userChats', auth.currentUser.uid), {
						[combinedId + '.userInfo']: {
							uid: user.uid,
							displayName: user.displayName,
							photoURL: user.photoURL
						},
						[combinedId + '.date']: serverTimestamp()
					})
					await updateDoc(doc(db, 'userChats', user.uid), {
						[combinedId + '.userInfo']: {
							uid: auth.currentUser.uid,
							displayName: auth.currentUser.displayName,
							photoURL: auth.currentUser.photoURL
						},
						[combinedId + '.date']: serverTimestamp()
					})
				}
				setValue('')
			} catch (error) {
				console.log(error)
			}
		}
	}

	return useMemo(() => handleClick, [])
}
