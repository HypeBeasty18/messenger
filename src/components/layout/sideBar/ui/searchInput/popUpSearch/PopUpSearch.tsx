import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DocumentData } from 'firebase/firestore'
import { FC, useState } from 'react'

import s from './PopUpSearch.module.scss'

type Props = {
	users: DocumentData[]
}

const PopUpSearch: FC<Props> = ({ users }) => {
	const [current, setCurrent] = useState(1)

	return (
		<div className={s.container}>
			<ul>
				{users.map(user => (
					<li key={user.displayName}>
						<button className={0 === current ? s.active : undefined}>
							<Avatar>
								<AvatarImage src={user.photoURL} />
								<AvatarFallback>{user.displayName}</AvatarFallback>
							</Avatar>
							<div className={s.mInfo}>
								<span>{user.displayName}</span>
							</div>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PopUpSearch
