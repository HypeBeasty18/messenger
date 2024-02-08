import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { FC, useState } from 'react'
import { IoMdMail } from 'react-icons/io'

import { messages } from '../messages.list'

import s from './AllMesages.module.scss'

type Props = {}

const AllMessages: FC = (props: Props) => {
	const [current, setCurrent] = useState<number>(0)

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
				{messages.map((mPin, index) => (
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

export default AllMessages
