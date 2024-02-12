
import { FC } from 'react'
import s from './ChatBlock.module.scss'
import InputMessage from './inputMessage/InputMessage'
import Messages from './messages/Messages'


const ChatBlock:FC = () => {
	return (
		<div className={s.container}>
			<Messages />
			<InputMessage  />
		</div>
	)
}

export default ChatBlock
