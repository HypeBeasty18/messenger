import React, { FC, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { LuUpload } from 'react-icons/lu'

import s from './EditUserData.module.scss'
import { useEditUserData } from './useEditUserData'

type Props = {
	popUpRef: React.RefObject<HTMLDivElement>
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>
	currentButton: string
}

const EditUserData: FC<Props> = ({ popUpRef, setIsShow, currentButton }) => {
	const {
		error,
		register,
		handleSubmit,
		onSubmit,
		dispayName,
		setdispayName,
		uploadImage,
		handleFileChange,
		previewUrl
	} = useEditUserData()

	const [drag, setDrag] = useState<boolean>(false)

	return (
		<>
			{currentButton === 'name' ? (
				<div className={s.container}>
					<div className={s.popUpContainer} ref={popUpRef}>
						<div className={s.inner}>
							<div className={s.upBlock}>
								<h3>Edit your name</h3>
								<button onClick={() => setIsShow(false)}>
									<IoClose className={s.icon} />
								</button>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div>
									<p>Name</p>
									<input
										type='text'
										{...register('name', { required: true })}
										value={dispayName}
										onChange={e => setdispayName(e.target.value)}
									/>
								</div>

								<div className={s.btnsBlock}>
									<button type='button' onClick={() => setIsShow(false)}>
										Cancel
									</button>
									<button type='submit'>Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			) : (
				<div className={s.container}>
					<div className={s.popUpContainer} ref={popUpRef}>
						<div className={s.inner}>
							{drag ? (
								<div
									className={s.dragFile}
									onDragStart={e => {
										e.preventDefault()
										setDrag(true)
									}}
									onDragLeave={e => {
										e.preventDefault()
										setDrag(false)
									}}
									onDragOver={e => {
										e.preventDefault()
										setDrag(true)
									}}
									onDrop={e => {
										handleFileChange(e, 'drag')
										setDrag(false)
									}}
								>
									Drop photo here
								</div>
							) : (
								<div
									onDragStart={e => {
										e.preventDefault()
										setDrag(true)
									}}
									onDragLeave={e => {
										e.preventDefault()
										setDrag(false)
									}}
									onDragOver={e => {
										e.preventDefault()
										setDrag(true)
									}}
								>
									<div className={s.upBlock}>
										<h3>Edit your photo</h3>
										<button onClick={() => setIsShow(false)}>
											<IoClose className={s.icon} />
										</button>
									</div>
									<form onSubmit={uploadImage}>
										<div>
											<p>Upload new photo or drop it</p>
											<div className={s.inputImg}>
												<label htmlFor='uploadImage' className={s.labelPhoto}>
													<LuUpload />
												</label>
												<input
													className='hidden'
													id='uploadImage'
													type='file'
													onChange={e => handleFileChange(e, 'upload')}
												/>
												{previewUrl && (
													<img className={s.previewImg} src={previewUrl} />
												)}
											</div>
										</div>
										<div className={s.btnsBlock}>
											<button type='button' onClick={() => setIsShow(false)}>
												Cancel
											</button>
											<button type='submit'>Save</button>
										</div>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default EditUserData
