import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from 'firebaseConfig/firebase'
import { useActions, useAppSelector } from 'hooks/useActions'
import { FC, useEffect, useState } from 'react'
import { PiNotePencil } from 'react-icons/pi'

import s from './SideBar.module.scss'
import AllMessages from './allMessages/AllMessages'
import PinnedMessage from './pinnedMesssage/PinnedMessage'
import SearchInput from './ui/searchInput/SearchInput'

const SideBar: FC = () => {
	const [isFinded, setIsFinded] = useState<boolean>(false)

	const actions = useActions()
	const messages = useAppSelector(state => state.messages)

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

	return (
		<div className={s.container}>
			<div className={s.upInner}>
				<div className={s.header}>
					<h2>
						Messages{' '}
						<span>({messages ? Object.entries(messages).length : 0})</span>
					</h2>
					<button>
						<PiNotePencil className={s.createIcon} />
					</button>
				</div>
				<SearchInput setIsFinded={setIsFinded} />
			</div>
			{!isFinded && (
				<>
					<PinnedMessage />
					<AllMessages />
				</>
			)}
		</div>
	)
}

export default SideBar
