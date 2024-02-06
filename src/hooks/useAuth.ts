import { signOut } from 'firebase/auth'
import { auth } from 'firebaseConfig/firebase'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserService } from 'services/User.service'
import { TDataInput } from 'types/types'

export const useAuth = () => {
	const [type, setType] = useState<string>('')
	const navigate = useNavigate()
	const [error, setError] = useState<string>('')

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TDataInput>({
		mode: 'onSubmit'
	})

	const onSubmit: SubmitHandler<TDataInput> = userData => {
		if (type === 'signup') {
			UserService.SignUpUser({
				username: userData.username,
				password: userData.password
			})
		} else if (type === 'login') {
			UserService.LogInUser({
				username: userData.username,
				password: userData.password
			})
		}

		reset()
	}

	const handleGoogle = () => {
		UserService.SignInGoogleUser()
	}

	const handleLogout = () => {
		signOut(auth)
	}

	useEffect(() => {		
		if (auth.currentUser?.uid){
			navigate('/')
		}
	},[auth.currentUser])

	return useMemo(
		() => ({
			setType,
			register,
			handleSubmit,
			onSubmit,
			errors,
			error,
			handleGoogle,
			handleLogout
		}),
		[type, error, errors, handleGoogle, handleLogout]
	)
}
