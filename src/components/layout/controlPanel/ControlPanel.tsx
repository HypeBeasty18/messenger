import Avatar from 'components/ui/Avatar'
import ControlBtn from 'components/ui/controlBtn/ControlBtn'
import PopUpProfileMe from 'components/ui/poUpProfileMe/PopUpProfileMe'
import { userControls } from 'data/userControls.data'
import { auth } from 'firebaseConfig/firebase'
import { useAuth } from 'hooks/useAuth'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { FC } from 'react'
import { LuLogOut } from 'react-icons/lu'

import s from './ControlPanel.module.scss'

const ControlPanel: FC = () => {
	const { handleLogout } = useAuth()

	const { ref, isShow, setIsShow } = useOnClickOutside({isInitialValue:false})

	return (
		<>
			<div className={s.container}>
				<div className={s.profilePhoto} onClick={() => setIsShow(true)}>
					{auth.currentUser?.photoURL && (
						<Avatar img={auth.currentUser?.photoURL} size={'40'} />
					)}
				</div>
				<div className={s.listSettings}>
					<ul>
						{userControls.map(userControl => (
							<li key={userControl.name}>
								<ControlBtn userControl={userControl} />
							</li>
						))}
					</ul>
					<button className={s.logout} onClick={handleLogout}>
						<LuLogOut className={s.icon} />
					</button>
				</div>
			</div>
			{isShow && <PopUpProfileMe popUpRef={ref} setIsShow={setIsShow} />}
		</>
	)
}

export default ControlPanel
