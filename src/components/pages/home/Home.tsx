import Layout from 'components/layout/Layout'

import s from './Home.module.scss'
import ChatBlock from './chatBlock/ChatBlock'
import UpChatBlock from './upChatBlock/UpChatBlock'

const Home = () => {
	return (
		<Layout>
			<div className={s.container}>
				<UpChatBlock />
				<ChatBlock />
			</div>
		</Layout>
	)
}

export default Home
