import { FC } from 'react'
import { LuImage, LuUser } from 'react-icons/lu'

import s from './ProfileBtn.module.scss'
import EditUserData from './editUserData/EditUserData'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import Avatar from 'components/ui/Avatar'
import { auth } from 'firebaseConfig/firebase'

type Props = {
	name?: string
	img?: string
}

const ProfileBtn: FC<Props> = ({ name, img }) => {

  const { ref, isShow, setIsShow } = useOnClickOutside({isInitialValue:false})

  const currentButton = name ? 'name' : 'img'
	return (
		<>
			<button className={s.container} onClick={() => setIsShow(true)}>
				<div className={s.inner}>
					<label className={s.nameBtn}>
						{name ? (
							<LuUser className={s.icon} />
						) : (
							<LuImage className={s.icon} />
						)}
						<p>{name ? 'Name' : 'Your photo'}</p>
					</label>
					{name ? <span>{name}</span> : auth.currentUser?.photoURL && <Avatar img={auth.currentUser?.photoURL} size={'40'}/> }
				</div>
			</button>
      {isShow && <EditUserData popUpRef={ref} setIsShow={setIsShow} currentButton={currentButton}/>}
		</>
	)
}

export default ProfileBtn
