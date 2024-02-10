import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { LuImage, LuPaperclip } from 'react-icons/lu'
import { TInputMessage } from 'types/types'

interface Props {
	id: string
	register: UseFormRegister<TInputMessage>
	filesRef: React.MutableRefObject<File[] | null>
}

const InputFile: FC<Props> = ({ id, register, filesRef }) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files
		if (fileList) {
			const fileArray: File[] = Array.from(fileList)
			filesRef.current = fileArray
		} else {
			filesRef.current = null
		}
	}

	if (id === 'image') {
		return (
			<>
				<label htmlFor='image'>
					<LuImage />
				</label>
				<input
					{...register('image')}
					id='image'
					type='file'
					accept='image/*'
					style={{ display: 'none' }}
					name='image'
					onChange={handleFileChange}
				/>
			</>
		)
	} else if (id === 'file') {
		return (
			<>
				<label htmlFor='file'>
					<LuPaperclip />
				</label>
				<input
					{...register('file')}
					id='file'
					name='file'
					type='file'
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
			</>
		)
	}
}

export default InputFile
