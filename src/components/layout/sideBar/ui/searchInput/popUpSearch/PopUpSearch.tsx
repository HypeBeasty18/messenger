import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DocumentData } from 'firebase/firestore'
import { FC } from 'react'

import s from './PopUpSearch.module.scss'
import { usePopUpSearch } from './usePopUpSearch'

interface Props {
	setValue: React.Dispatch<React.SetStateAction<string>>
	user: DocumentData
}

const PopUpSearch: FC<Props> = ({ user, setValue }) => {
	const handleClick = usePopUpSearch({ user, setValue })

	return (
		<button className={s.button} onClick={handleClick}>
			<Avatar>
				<AvatarImage src={user.photoURL} />
				<AvatarFallback>{user.displayName}</AvatarFallback>
			</Avatar>
			<div className={s.mInfo}>
				<span>{user.displayName}</span>
			</div>
		</button>
	)
}

export default PopUpSearch
