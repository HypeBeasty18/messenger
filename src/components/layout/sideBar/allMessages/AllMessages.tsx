import QuickMessage from 'components/ui/quickMwssage/QuickMessage'
import { updateArray } from 'helpers/updateArray'
import { useAppSelector } from 'hooks/useActions'
import { useAuth } from 'hooks/useAuth'
import { useChatClick } from 'hooks/useChatClick'
import { FC } from 'react'
import { IoMdMail } from 'react-icons/io'

import s from './AllMesages.module.scss'

const AllMessages: FC = () => {
	const messages = useAppSelector(state => state.messages)
	const handleSelect = useChatClick()
	
	const { handleLogout } = useAuth()
	const filteredMessages = updateArray(messages)

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
				{filteredMessages &&
					filteredMessages.map(message => (
						<li key={message.key}>
							<QuickMessage message={message} handleSelect={handleSelect} />
						</li>
					))}
			</ul>
			<button onClick={handleLogout}>Click</button>
		</div>
	)
}

export default AllMessages
