import { updateProfile } from 'firebase/auth'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, db, storage } from 'firebaseConfig/firebase'
import { ChangeEvent, DragEvent, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

type TEditUserData = {
	name: string
}

export const useEditUserData = () => {
	const [dispayName, setdispayName] = useState<string>(
		auth.currentUser?.displayName
	)
	const [error, setError] = useState<string | null>(null)

	const refPhoto = useRef<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const { register, handleSubmit, reset } = useForm<TEditUserData>({
		mode: 'onSubmit'
	})
	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>,
		type: string
	) => {
		e.preventDefault()
		let fileList: FileList | null = null

		if (type === 'drag') {
			fileList = (e as DragEvent<HTMLDivElement>).dataTransfer.files
		} else if (type === 'upload') {
			fileList = (e as ChangeEvent<HTMLInputElement>).target.files
		}

		console.log(fileList)

		if (fileList && fileList.length > 0) {
			const file = fileList[0]
			console.log(fileList[0])

			refPhoto.current = file

			const reader = new FileReader()
			reader.onload = () => {
				setPreviewUrl(reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			refPhoto.current = null
			setPreviewUrl(null)
		}
	}

	const uploadImage = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (auth.currentUser || refPhoto.current) {
			console.log(refPhoto)

			const storageRef = ref(storage, uuid())
			const uploadTask = uploadBytesResumable(storageRef, refPhoto.current)

			uploadTask.on(
				'state_changed',
				() => {},
				error => {
					console.error('Error during file upload:', error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then(async downloadURL => {
							await updateDoc(doc(db, 'users', auth.currentUser?.uid), {
								messages: arrayUnion({
									id: auth.currentUser?.uid,
									displayName: auth.currentUser?.displayName,
									username: auth.currentUser?.email,
									photoURL: downloadURL
								})
							})
							await updateProfile(auth.currentUser, {
								photoURL: downloadURL
							})
						})
						.catch(error => {
							console.error('Error getting download URL:', error)
						})
				}
			)
		}
	}

	const onSubmit: SubmitHandler<TEditUserData> = async userData => {
		if (auth.currentUser) {
			try {
				await updateProfile(auth.currentUser, {
					displayName: userData.name
				})
				await setDoc(doc(db, 'users', auth.currentUser.uid), {
					displayName: userData.name,
					photoURL: auth.currentUser.photoURL,
					uid: auth.currentUser.uid,
					username: auth.currentUser.email
				})
			} catch (error) {
				console.log(error)
				setError(error.message)
			}
		}

		reset()
	}

	return useMemo(
		() => ({
			error,
			register,
			handleSubmit,
			onSubmit,
			dispayName,
			setdispayName,
			uploadImage,
			handleFileChange,
			previewUrl
		}),
		[
			register,
			onSubmit,
			uploadImage,
			handleFileChange,
			previewUrl,
			error,
			dispayName
		]
	)
}
