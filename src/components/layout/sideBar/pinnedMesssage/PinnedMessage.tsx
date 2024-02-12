import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { useAppSelector } from 'hooks/useActions'
import { useChatClick } from 'hooks/useChatClick'
import { FC, useState } from 'react'
import { BsFillPinAngleFill } from 'react-icons/bs'

import s from './PinnedMessage.module.scss'

const PinnedMessage: FC = () => {
	const [current, setCurrent] = useState<number>(1)
	const messages = useAppSelector(state => state.messages)

	const handleSelect = useChatClick()

	const hasPinnedMes = Object.entries(messages).some(
		([, message]) => message.isPinned
	)

	return (
		<>
			{hasPinnedMes && (
				<div className={s.container}>
					<div className={s.upBlock}>
						<div>
							<BsFillPinAngleFill />
							Pinned message
						</div>
						<button>...</button>
					</div>
					<ul>
						{messages &&
							Object.entries(messages)
								.filter(([, message]) => message.isPinned)
								.sort(([, a], [, b]) => b.date - a.date)
								.map(([key, message]) => (
									<li key={key}>
										<button
											className={0 === current ? s.active : undefined}
											onClick={() => handleSelect(message.userInfo)}
										>
											<Avatar>
												<AvatarImage src={message.userInfo.photoURL} />
												<AvatarFallback>
													{message.userInfo.displayName}
												</AvatarFallback>
											</Avatar>

											<div className={s.mInfo}>
												<span>{message.userInfo.displayName}</span>
												<span>{message.lastMessage?.text}</span>
											</div>
										</button>
									</li>
								))}
					</ul>
				</div>
			)}
		</>
	)
}
export default PinnedMessage

// {mPin.isOnline && <span className={s.profileOnline}></span>}
