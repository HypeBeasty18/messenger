import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import InputFile from 'components/ui/inputFile/InputFile'
import { FC } from 'react'
import { LuSend } from 'react-icons/lu'

import s from './InputMessage.module.scss'
import { useSendMessage } from './useSendMessage'

const InputMessage: FC = () => {
	const { handleSubmit, onSubmit, register, filesRef } = useSendMessage()

	return (
		<div className={s.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={s.leftSide}>
					<Avatar>
						<AvatarImage src='/src/assets/icons/guessProfile.svg' />
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
						<InputFile id={'file'} register={register} filesRef={filesRef} />
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
