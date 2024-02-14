import Avatar from 'components/ui/Avatar'
import { auth } from 'firebaseConfig/firebase'
import { CalculateDate } from 'helpers/calculateDate'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { FC, useEffect, useRef } from 'react'
import { TMessage } from 'types/types'

import s from './MessageMe.module.scss'
import PopUpProfileMe from 'components/ui/poUpProfileMe/PopUpProfileMe'

type Props = {
	message: TMessage
	isNextSameRender: boolean
}

const MessageMe: FC<Props> = ({ message, isNextSameRender }) => {
	const { ref, isShow, setIsShow } = useOnClickOutside({
		isInitialValue: false
	})
	const refMes = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		{
			refMes.current && refMes.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [message])

	const formattedDate = CalculateDate(message)

	return (
		<div className={s.containerOwn} ref={refMes}>
			{isNextSameRender ? (
				<>
					<div className={s.innerSame}>
						<div className={s.mesInfo}>
							<div className={s.lowBlock}>
								{message.img && <img src={message.img} />}
								<div>
									<p className={s.textMes}>{message.text}</p>
									<span>{formattedDate}</span>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className={s.innerNotSame}>
						<div className={s.image}>
							{auth.currentUser?.photoURL && (
								<div className='cursor-pointer' onClick={() => setIsShow(true)}>
									<Avatar img={auth.currentUser?.photoURL} size={'30'} />
								</div>
							)}
						</div>
						<div className={s.mesInfo}>
							<div className={s.lowBlock}>
								{message.img && <img src={message.img} />}
								<div>
									<p className={s.textMes}>{message.text}</p>
									<span>{formattedDate}</span>
								</div>
							</div>
						</div>
					</div>
					{isShow && <PopUpProfileMe popUpRef={ref} setIsShow={setIsShow}/>}
				</>
			)}
		</div>
	)
}

export default MessageMe
