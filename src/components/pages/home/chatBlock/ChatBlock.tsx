import { useAppSelector } from 'hooks/useActions'

import s from './ChatBlock.module.scss'
import InputMessage from './inputMessage/InputMessage'
import Messages from './messages/Messages'

type Props = {}

const ChatBlock = (props: Props) => {
	const chatId = useAppSelector(state => state.currentChat.chatId)
	return (
		<div className={s.container}>
			{chatId ? (
				<>
					<Messages />
					<InputMessage />
				</>
			) : (
				<div className={s.emptyChat}><span>Select a chat to start messaging</span></div>
			)}
		</div>
	)
}

export default ChatBlock
