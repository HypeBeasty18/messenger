import { auth } from 'firebaseConfig/firebase'
import React, { FC, RefObject, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import s from './PopUpProfileMe.module.scss'
import ProfileBtn from './profileBtn/ProfileBtn'

type Props = {
	popUpRef: RefObject<HTMLDivElement>
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUpProfileMe: FC<Props> = ({ popUpRef, setIsShow }) => {
	const [name, setName] = useState<string>('')

	const nameRef = useRef<string>('')

	if (auth.currentUser?.displayName) {
		nameRef.current = auth.currentUser.displayName
	}

	return (
		<div className={s.container}>
			<div className={s.popUpContainer} ref={popUpRef}>
				<div className={s.inner}>
					<div className={s.upBlock}>
						<h3>Settings</h3>
						<button onClick={() => setIsShow(false)}>
							<IoClose className={s.icon} />
						</button>
					</div>
					<div className={s.lowBlock}>
						<div className={s.nameBlock}>
							<h4>Personal Info</h4>
							<p>Update your photo and personal details here</p>
						</div>
						<div className={s.infoProfile}>
							{auth.currentUser?.displayName && (
								<ProfileBtn name={auth.currentUser?.displayName} />
							)}
							{auth.currentUser?.photoURL && (
								<ProfileBtn img={auth.currentUser?.photoURL} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopUpProfileMe
