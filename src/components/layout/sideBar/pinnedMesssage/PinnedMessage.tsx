import QuickMessage from 'components/ui/quickMwssage/QuickMessage'
import { updatePinnedArray } from 'helpers/updateArray'
import { useAppSelector } from 'hooks/useActions'
import { useChatClick } from 'hooks/useChatClick'
import { FC } from 'react'
import { BsFillPinAngleFill } from 'react-icons/bs'

import s from './PinnedMessage.module.scss'

const PinnedMessage: FC = () => {
	const messages = useAppSelector(state => state.messages)

	const handleSelect = useChatClick()
	const filteredMessages = updatePinnedArray(messages)

	return (
		<>
			{filteredMessages.length > 0 && (
				<div className={s.container}>
					<div className={s.upBlock}>
						<div>
							<BsFillPinAngleFill />
							Pinned message
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
				</div>
			)}
		</>
	)
}
export default PinnedMessage
