import Avatar from 'components/ui/Avatar'
import { useAppSelector } from 'hooks/useActions'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { FC } from 'react'
import { LuPhone, LuSearch, LuSettings, LuVideo } from 'react-icons/lu'

import s from './UpChatBlock.module.scss'
import PopUpProfileYou from 'components/ui/popUpProfileYou/PopUpProfileYou'

const UpChatBlock: FC = () => {
	const userChat = useAppSelector(state => state.currentChat.user)

	const { ref, isShow, setIsShow } = useOnClickOutside({
		isInitialValue: false
	})

	return (
		<>
			<div className={s.container}>
				<div className={s.profileInfo} onClick={() => setIsShow(true)}>
					{userChat?.photoURL && (
						<Avatar img={userChat?.photoURL} size={'40'} />
					)}
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
			{isShow && <PopUpProfileYou popUpRef={ref} setIsShow={setIsShow} name={userChat?.displayName ? userChat?.displayName : '' } img={userChat?.photoURL ? userChat?.photoURL : ''}/>}
		</>
	)
}

export default UpChatBlock
