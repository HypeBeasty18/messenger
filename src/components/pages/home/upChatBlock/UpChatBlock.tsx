import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LuPhone, LuSearch, LuSettings, LuVideo } from 'react-icons/lu'

import s from './UpChatBlock.module.scss'
import { useAppSelector } from 'hooks/useActions'
import { FC } from 'react'


const UpChatBlock:FC = () => {

	const userChat = useAppSelector(state => state.currentChat.user)

	return (
		<div className={s.container}>
			<div className={s.profileInfo}>
				<Avatar>
					<AvatarImage src={userChat?.photoURL} />
					<AvatarFallback>icon</AvatarFallback>
				</Avatar>
				<p>{userChat?.displayName}</p>
			</div>
			<div className={s.chatSettings}>
				<ul>
					<li>
						<button>
							<LuPhone className={s.chatIcon} />
						</button>
					</li>
					<li>
						<button>
							<LuVideo className={s.chatIcon} />
						</button>
					</li>
					<li>
						<button>
							<LuSearch className={s.chatIcon} />
						</button>
					</li>
					<li>
						<button>
							<LuSettings className={s.chatIcon} />
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default UpChatBlock
