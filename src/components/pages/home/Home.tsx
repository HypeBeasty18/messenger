import Layout from 'components/layout/Layout'
import { useAppSelector } from 'hooks/useActions'

import s from './Home.module.scss'
import ChatBlock from './chatBlock/ChatBlock'
import UpChatBlock from './upChatBlock/UpChatBlock'
import { FC } from 'react'

const Home:FC = () => {
	const chatId = useAppSelector(state => state.currentChat.chatId)
	

	return (
		<Layout>
			<div className={s.container}>
				{chatId ? (
					<>
						<UpChatBlock />
						<ChatBlock />
					</>
				) : (
					<div className={s.emptyChat}>
						<span>Select a chat to start messaging</span>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Home
