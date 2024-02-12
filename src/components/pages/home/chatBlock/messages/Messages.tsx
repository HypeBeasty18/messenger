import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import React, { FC, useEffect, useRef, useState } from 'react'
import { TMessage } from 'types/types'

import s from './Messages.module.scss'
import MessageMe from './messageMe/MessageMe'
import MessageYou from './messageYou/MessageYou'

const Messages: FC = () => {
	const [messages, setMessages] = useState<TMessage[] | []>([])
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
						<React.Fragment key={m.date}>
							{auth.currentUser && auth.currentUser.uid === m.senderId ? (
								<MessageMe message={m} isNextSameRender={isNextSameRender} />
							) : (
								<MessageYou message={m} isNextSameRender={isNextSameRender} />
							)}
						</React.Fragment>
					)
				})}
		</div>
	)
}

export default Messages
