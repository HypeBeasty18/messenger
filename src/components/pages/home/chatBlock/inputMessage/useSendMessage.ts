import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, db, storage } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import { useMemo, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TInputMessage } from 'types/types'
import { v4 as uuid } from 'uuid'

export const useSendMessage = () => {
	const filesRef = useRef<File | null>(null)

	const currentChat = useAppSelector(state => state.currentChat)

	const { register, handleSubmit, reset } = useForm<TInputMessage>({
		mode: 'onSubmit'
	})

	const onSubmit: SubmitHandler<TInputMessage> = async userData => {
		if (filesRef.current && currentChat.chatId) {

			const storageRef = ref(storage, uuid())
			const uploadTask = uploadBytesResumable(storageRef, filesRef.current)

			uploadTask.on(
				'state_changed',
				() => {},
				error => {
					console.error('Error during file upload:', error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then(async downloadURL => {
							await updateDoc(doc(db, 'chats', currentChat.chatId), {
								messages: arrayUnion({
									id: uuid(),
									text: userData.message,
									senderId: auth.currentUser?.uid,
									date: Timestamp.now(),
									img: downloadURL
								})
							})
						})
						.catch(error => {
							console.error('Error getting download URL:', error)
						})
				}
			)
		} else if (currentChat.chatId) {
			await updateDoc(doc(db, 'chats', currentChat.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text: userData.message,
					senderId: auth.currentUser?.uid,
					date: Timestamp.now()
				})
			})
		}
		if (auth.currentUser && currentChat) {
			await updateDoc(doc(db, 'userChats', auth.currentUser?.uid), {
				[currentChat.chatId + '.lastMessage']: {
					text: userData.message
				},
				[currentChat.chatId + '.date']: serverTimestamp()
			})
			await updateDoc(doc(db, 'userChats', currentChat.user.uid), {
				[currentChat.chatId + '.lastMessage']: {
					text: userData.message
				},
				[currentChat.chatId + '.date']: serverTimestamp()
			})
		}

		filesRef.current = null
		reset()
	}

	return useMemo(
		() => ({ handleSubmit, onSubmit, register, filesRef }),
		[register, onSubmit]
	)
}
