import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import { useEffect, useRef, useState } from 'react'

import s from './Messages.module.scss'
import MessageMe from './messageMe/MessageMe'
import MessageYou from './messageYou/MessageYou'

type TMessage = {
	m: {
		date: {
			seconds: number
			nanoseconds: number
		}
		id: string
		senderId: string
		text: string
	}
}

const Messages = () => {
	const [messages, setMessages] = useState<[]>([])
	const [prevSenderId, setPrevSenderId] = useState<string>('')
	const chatId = useAppSelector(state => state.currentChat.chatId)

	const currentRef = useRef('')

	useEffect(() => {
		if (chatId) {
			const unsub = onSnapshot(doc(db, 'chats', chatId), doc => {
				doc.exists() && setMessages(doc.data().messages)
			})
			return () => {
				unsub()
			}
		}
	}, [chatId])

	return (
		<div className={s.container}>
			<div className={s.startDialog}>
				<p>Dialog beginning</p>
			</div>
			{messages.length > 0 &&
				messages.map((m, index) => {
					let isNextSameRender = false
					currentRef.current = m.senderId
					if (
						index < messages.length - 1 &&
						currentRef.current === messages[index + 1].senderId
					) {
						isNextSameRender = true
					}

					return (
						<>
							{auth.currentUser && auth.currentUser.uid === m.senderId ? (
								<MessageMe
									message={m}
									key={index}
									isNextSameRender={isNextSameRender}
								/>
							) : (
								<MessageYou
									message={m}
									key={index}
									isNextSameRender={isNextSameRender}
								/>
							)}
						</>
					)
				})}
		</div>
	)
}

export default Messages
