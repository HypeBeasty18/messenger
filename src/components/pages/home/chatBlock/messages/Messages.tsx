import { doc, onSnapshot } from 'firebase/firestore'
import { db } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import React, { useEffect, useState } from 'react'

import s from './Messages.module.scss'

type Props = {
  messages: []
}

const Messages = () => {
	const [messages, setMessages] = useState<Props | null>(null)

	const chatId = useAppSelector(state => state.currentChat.chatId)

	useEffect(() => {
		if (chatId) {
			const unsub = onSnapshot(doc(db, 'chats', chatId), doc => {
				doc.exists() && doc.data && setMessages(doc.data)
				console.log(messages)
			})
      return () => {
        unsub()
      }
		}
	}, [chatId])

	return <div className={s.container}></div>
}

export default Messages
