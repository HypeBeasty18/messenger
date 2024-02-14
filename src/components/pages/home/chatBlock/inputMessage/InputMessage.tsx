import Avatar from 'components/ui/Avatar'
import InputFile from 'components/ui/inputFile/InputFile'
import { auth } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { FC, useEffect } from 'react'
import { LuSend } from 'react-icons/lu'

import s from './InputMessage.module.scss'
import { useSendMessage } from './useSendMessage'
import PopUpProfileMe from 'components/ui/poUpProfileMe/PopUpProfileMe'

const InputMessage: FC = () => {
	const { handleSubmit, onSubmit, register, filesRef, setFocus } =
		useSendMessage()

	const chatId = useAppSelector(state => state.currentChat.chatId)
	const { ref, isShow, setIsShow } = useOnClickOutside({
		isInitialValue: false
	})

	useEffect(() => {
		setFocus('message')
	}, [chatId])

	return (
		<>
			<div className={s.container}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={s.leftSide}>
						<div onClick={() => setIsShow(true)} className='cursor-pointer'>
							{auth.currentUser?.photoURL && (
								<Avatar size={'30'} img={auth.currentUser?.photoURL} />
							)}
						</div>

						<input
							autoComplete='off'
							className={s.inputText}
							{...register('message', { required: true })}
							type='text'
							placeholder='Your message'
						/>
					</div>
					<div className={s.rightSide}>
						<div className={s.filesInput}>
							<InputFile id={'image'} register={register} filesRef={filesRef} />
						</div>
						<button type='submit'>
							<LuSend />
						</button>
					</div>
				</form>
			</div>
			{isShow && <PopUpProfileMe popUpRef={ref} setIsShow={setIsShow} />}
		</>
	)
}

export default InputMessage
