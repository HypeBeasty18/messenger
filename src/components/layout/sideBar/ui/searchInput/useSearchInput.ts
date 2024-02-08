import {
	DocumentData,
	QueryConstraint,
	collection,
	getDocs,
	query,
	where
} from 'firebase/firestore'
import { db } from 'firebaseConfig/firebase'
import { useEffect, useMemo, useState } from 'react'

interface Props {
	value: string
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}
export const useSearchInput = ({ value, setIsShow }: Props) => {
	const [users, setUsers] = useState<DocumentData[]>([])
	const [err, setErr] = useState<boolean>(false)

	const handleSearch = async () => {
		try {
			const q = query(
				collection(db, 'users'),
				where('displayName', '>=', value),
				where('displayName', '<=', value + '\uf8ff') as QueryConstraint
			)
			const querySnapshot = await getDocs(q)
			const foundUsers = querySnapshot.docs.map(doc => doc.data())
			setUsers(foundUsers)
			setErr(false)
			console.log(foundUsers, value)

			if (foundUsers.length > 0) {
				setIsShow(true)
			} else {
				setIsShow(false)
			}
		} catch (error) {
			setUsers([])
			setIsShow(false)
			setErr(true)
		}
	}

	useEffect(() => {
		if (value.trim() !== '') {
			handleSearch()
		} else {
			setUsers([])
			setIsShow(false)
		}
	}, [value, setIsShow])

	return useMemo(() => ({ users, err }), [users, err])
}
