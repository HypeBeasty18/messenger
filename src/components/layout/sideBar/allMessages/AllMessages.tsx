import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { useAppSelector } from 'hooks/useActions'
import { useAuth } from 'hooks/useAuth'
import { useChatClick } from 'hooks/useChatClick'
import { FC } from 'react'
import { IoMdMail } from 'react-icons/io'
import 'react-loading-skeleton/dist/skeleton.css'

import s from './AllMesages.module.scss'

const AllMessages: FC = () => {
	const messages = useAppSelector(state => state.messages)

	const handleSelect = useChatClick()

	const { handleLogout } = useAuth()

	return (
		<div className={s.container}>
			<div className={s.upBlock}>
				<div>
					<IoMdMail />
					All message
				</div>
				<button>...</button>
			</div>
			<ul>
				{messages &&
					Object.entries(messages)
						.filter(([, message]) => !message.isPinned)

						.sort(([, a], [, b]) => b.date - a.date)
						.map(([key, message]) => (
							<li key={key}>
								<button onClick={() => handleSelect(message.userInfo)}>
									<Avatar>
										<AvatarImage src={message.userInfo.photoURL} />
										<AvatarFallback>icon</AvatarFallback>
									</Avatar>
									<div className={s.mInfo}>
										<span>{message.userInfo.displayName}</span>
										<span>{message.lastMessage?.text}</span>
									</div>
								</button>
							</li>
						))}
			</ul>
			<button onClick={handleLogout}>Click</button>
		</div>
	)
}

export default AllMessages
