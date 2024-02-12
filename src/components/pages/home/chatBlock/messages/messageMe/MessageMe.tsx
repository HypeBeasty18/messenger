import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { auth } from 'firebaseConfig/firebase'
import { CalculateDate } from 'helpers/calculateDate'
import { useAppSelector } from 'hooks/useActions'
import { FC, useEffect, useRef } from 'react'
import { TMessage } from 'types/types'

import s from './MessageMe.module.scss'

type Props = {
	message: TMessage
	isNextSameRender: boolean
}

const MessageMe: FC<Props> = ({ message, isNextSameRender }) => {
	const chatUser = useAppSelector(state => state.currentChat.user)

	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		{
			ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [message])

	const formattedDate = CalculateDate(message)

	return (
		<div className={s.containerOwn} ref={ref}>
			{isNextSameRender ? (
				<>
					<div className={s.innerSame}>
						<div className={s.mesInfo}>
							<div className={s.lowBlock}>
								{message.img && <img src={message.img} />}
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
											: chatUser && chatUser.photoURL
									}
								/>
								<AvatarFallback>icon</AvatarFallback>
							</Avatar>
						</div>
						<div className={s.mesInfo}>
							<div className={s.lowBlock}>
								{message.img && <img src={message.img} />}
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
