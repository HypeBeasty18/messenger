import React, { FC, RefObject, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import s from './PopUpProfileYou.module.scss'
import Avatar from '../Avatar'

type Props = {
	popUpRef: RefObject<HTMLDivElement>
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>
	name: string
	img: string
}

const PopUpProfileYou: FC<Props> = ({ popUpRef, setIsShow, img, name }) => {
	return (
		<div className={s.container}>
			<div className={s.popUpContainer} ref={popUpRef}>
				<div className={s.inner}>
					<div className={s.upBlock}>
						<h3>User info</h3>
						<button onClick={() => setIsShow(false)}>
							<IoClose className={s.icon} />
						</button>
					</div>
					<div className={s.lowBlock}>
						<div className={s.nameBlock}>
							<h4>Personal Info</h4>
						</div>
						<div className={s.infoProfile}>
              <p>{name}</p>
              <Avatar img={img} size={'40'}/>
            </div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopUpProfileYou
