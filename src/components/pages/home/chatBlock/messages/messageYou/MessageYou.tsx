import Avatar from 'components/ui/Avatar'
import { CalculateDate } from 'helpers/calculateDate'
import { useAppSelector } from 'hooks/useActions'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { FC, useEffect, useRef } from 'react'
import { TMessage } from 'types/types'

import s from './MessageYou.module.scss'
import PopUpProfileYou from 'components/ui/popUpProfileYou/PopUpProfileYou'

type Props = {
	message: TMessage
	isNextSameRender: boolean
}

const MessageYou: FC<Props> = ({ message, isNextSameRender }) => {
	const chatUser = useAppSelector(state => state.currentChat.user)

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
		<div className={s.containerSomebody} ref={refMes}>
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
							{chatUser && chatUser.photoURL && (
								<div className='cursor-pointer' onClick={() => setIsShow(true)}>
									<Avatar img={chatUser.photoURL} size={'30'} />
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
					{isShow && chatUser  && <PopUpProfileYou popUpRef={ref} setIsShow={setIsShow} name={chatUser?.displayName} img={chatUser?.photoURL}/>}
				</>
			)}
		</div>
	)
}

export default MessageYou
