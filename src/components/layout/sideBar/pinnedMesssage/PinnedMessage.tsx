import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { FC, useState } from 'react'
import { BsFillPinAngleFill } from 'react-icons/bs'

import { messages } from '../messages.list'

import s from './PinnedMessage.module.scss'

type Props = {}

const PinnedMessage: FC = (props: Props) => {
	const [current, setCurrent] = useState<number>(1)

	return (
		<div className={s.container}>
			<div className={s.upBlock}>
				<div>
					<BsFillPinAngleFill />
					Pinned message
				</div>
				<button>...</button>
			</div>
			<ul>
				{messages
					.filter(message => message.isPinned === true)
					.map((mPin, index) => (
						<li key={index}>
							<button className={index === current ? s.active : undefined}>
								<Avatar>
									<AvatarImage src={mPin.img} />
									<AvatarFallback>{mPin.name}</AvatarFallback>
								</Avatar>
								{mPin.isOnline && <span className={s.profileOnline}></span>}

								<div className={s.mInfo}>
									<span>{mPin.name}</span>
									<span>{mPin.lastMessage}</span>
								</div>
							</button>
						</li>
					))}
			</ul>
		</div>
	)
}

export default PinnedMessage
