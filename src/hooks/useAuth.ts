import { signOut } from 'firebase/auth'

import { auth } from 'firebaseConfig/firebase'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserService } from 'services/User.service'
import { TDataInput } from 'types/types'

import { useActions, useAppSelector } from './useActions'

export const useAuth = () => {
	const [type, setType] = useState<string>('')
	const navigate = useNavigate()
	const [error, setError] = useState<string>('')
	const actions = useActions()

	const isAuth = useAppSelector(state => state.auth.isAuth)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TDataInput>({
		mode: 'onSubmit'
	})

	const onSubmit: SubmitHandler<TDataInput> = async userData => {
		try {
			if (type === 'signup') {
				await UserService.SignUpUser({
					username: userData.username,
					password: userData.password
				})
			} else if (type === 'login') {
				await UserService.LogInUser({
					username: userData.username,
					password: userData.password
				})
			}
			actions.login()
		} catch (error) {
			setError(error.message)
		}

		reset()
	}

	const handleGoogle = async () => {
		try {
			await UserService.SignInGoogleUser()
			actions.login()
		} catch (error) {
			setError(error.message)
		}
	}

	const handleLogout = async () => {
		try {
			await signOut(auth)
			actions.logout()
			actions.removeCurrentChat()
			actions.removeMessages()
		} catch (error) {
			setError(error.message)
		}
	}

	useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth])

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
