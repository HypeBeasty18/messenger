import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { auth } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import { FC, useEffect, useRef } from 'react'

import s from './MessageMe.module.scss'

type Props = {
	message: {
		date: {
			seconds: number
			nanoseconds: number
		}
		id: string
		senderId: string
		text: string
	}
	isNextSameRender: boolean
}

const MessageMe: FC<Props> = ({ message, isNextSameRender }) => {
	const chatUser = useAppSelector(state => state.currentChat.user)

	const ref = useRef()

	useEffect(() => {
		ref.current.scrollIntoView({behavior: 'smooth'})
	}, [message])

	const messageDate = new Date(
		message.date.seconds * 1000 + message.date.nanoseconds / 1000000
	)

	const currentDate = new Date()

	let formattedDate: string

	if (
		messageDate.getDate() === currentDate.getDate() &&
		messageDate.getMonth() === currentDate.getMonth() &&
		messageDate.getFullYear() === currentDate.getFullYear()
	) {
		formattedDate = messageDate.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		})
	} else {
		formattedDate = messageDate.toLocaleDateString([], {
			day: 'numeric',
			month: 'short'
		})
	}

	return (
		<div className={s.containerOwn} ref={ref}>
			{isNextSameRender ? (
				<>
					<div className={s.innerSame}>
						<div className={s.mesInfo}>
							<div className={s.lowBlock}>
								<p className={s.textMes}>{message.text}</p>
								<span>{formattedDate}</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className={s.innerNotSame}>
						<div className={s.image}>
							<Avatar>
								<AvatarImage
									src={
										message.senderId === auth.currentUser?.uid
											? auth.currentUser.photoURL
											: chatUser.photoURL
									}
								/>
								<AvatarFallback>icon</AvatarFallback>
							</Avatar>
						</div>
						<div className={s.mesInfo}>
							<div className={s.lowBlock}>
								<p className={s.textMes}>{message.text}</p>
								<span>{formattedDate}</span>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default MessageMe
