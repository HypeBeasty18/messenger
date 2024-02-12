import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import InputFile from 'components/ui/inputFile/InputFile'
import { auth } from 'firebaseConfig/firebase'
import { useAppSelector } from 'hooks/useActions'
import { FC, useEffect } from 'react'
import { LuSend } from 'react-icons/lu'

import s from './InputMessage.module.scss'
import { useSendMessage } from './useSendMessage'

const InputMessage: FC = () => {
	const { handleSubmit, onSubmit, register, filesRef, setFocus } =
		useSendMessage()

	const chatId = useAppSelector(state => state.currentChat.chatId)

	useEffect(() => {
		setFocus('message')
	}, [chatId])

	return (
		<div className={s.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.leftSide}>
					<Avatar>
						<AvatarImage src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : '/src/assets/icons/guessProfile.svg' } />
						<AvatarFallback>icon</AvatarFallback>
					</Avatar>
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
	)
}

export default InputMessage
