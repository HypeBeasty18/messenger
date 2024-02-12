import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useChatClick } from 'hooks/useChatClick'
import { FC } from 'react'

import s from './PopUpSearch.module.scss'
import { usePopUpSearch } from './usePopUpSearch'

interface Props {
	setValue: React.Dispatch<React.SetStateAction<string>>
	user: {
		displayName: string
		photoURL: string
		uid: string
		username: string
	}
}

const PopUpSearch: FC<Props> = ({ user, setValue }) => {
	const handleClick = usePopUpSearch({ user, setValue })
	const handleSelect = useChatClick()

	const handleBind = () => {
		handleClick()
		handleSelect(user)
	}

	return (
		<button className={s.button} onClick={handleBind}>
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
