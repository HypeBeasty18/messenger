import { FC } from 'react'
import { Chat, TUserSelect } from 'types/types'

import s from './QuickMessage.module.scss'
import Avatar from '../Avatar'

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
			<Avatar img={message.userInfo.photoURL} size={'40'}/>

			<div className={s.mInfo}>
				<span>{message.userInfo.displayName}</span>
				<span>{message.lastMessage?.text}</span>
			</div>
		</button>
	)
}

export default QuickMessage
