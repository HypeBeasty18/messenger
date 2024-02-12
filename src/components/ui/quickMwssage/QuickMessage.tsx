import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { FC } from 'react'
import { Chat, TUserSelect } from 'types/types'

import s from './QuickMessage.module.scss'

interface Props {
	message: Chat
	handleSelect: (userinfo: TUserSelect) => void
}

const QuickMessage: FC<Props> = ({ message, handleSelect }) => {
	return (
		<button
			onClick={() => handleSelect(message.userInfo)}
			className={s.container}
		>
			<Avatar>
				<AvatarImage src={message.userInfo.photoURL} />
				<AvatarFallback>icon</AvatarFallback>
			</Avatar>
			<div className={s.mInfo}>
				<span>{message.userInfo.displayName}</span>
				<span>{message.lastMessage?.text}</span>
			</div>
		</button>
	)
}

export default QuickMessage
