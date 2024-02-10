import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LuPhone, LuSearch, LuSettings, LuVideo } from 'react-icons/lu'

import s from './UpChatBlock.module.scss'

type Props = {}

const UpChatBlock = (props: Props) => {
	return (
		<div className={s.container}>
			<div className={s.profileInfo}>
				<Avatar>
					<AvatarImage src='/src/assets/icons/guessProfile.svg' />
					<AvatarFallback>icon</AvatarFallback>
				</Avatar>
				<p>John</p>
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
