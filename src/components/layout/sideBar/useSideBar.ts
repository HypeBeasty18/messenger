import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from 'firebaseConfig/firebase'
import { useActions } from 'hooks/useActions'
import { useEffect } from 'react'

export const useSideBar = () => {
	const actions = useActions()

	useEffect(() => {
		const getChats = () => {
			if (auth.currentUser) {
				return onSnapshot(doc(db, 'userChats', auth.currentUser.uid), doc => {
					const data = doc.data()
					if (data) {
						actions.saveMessages(data)
					}
				})
			}
		}
		const unsubscribe = getChats()
		return () => {
			unsubscribe
		}
	}, [auth.currentUser])
}


