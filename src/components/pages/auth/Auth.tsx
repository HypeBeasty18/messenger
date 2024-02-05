import InputData from 'components/ui/inputData/InputData'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TDataInput } from '../../../../types'

import s from './Auth.module.scss'
import FormBtn from 'components/ui/formBtn/FormBtn'

const Auth: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TDataInput>({
		mode: 'onSubmit'
	})

	const onSubmit: SubmitHandler<TDataInput> = async userData => {
		console.log(userData)

		reset()
	}

	return (
		<div className={s.container}>
			<div className={s.inner}>
				<header>
					<img src='/src/assets/icons/logo.png' draggable={false} />
				</header>
				<main>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={s.inputsCont}>
							<InputData
								error={errors?.username?.message}
								autoComplete='email'
								name='username'
								register={register}
								options={{
									required: 'Email is required',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Incorrect email format'
									}
								}}
								type='text'
								placeholder='Enter email'
							/>
							<InputData
								error={errors?.password?.message}
								name='password'
								register={register}
								options={{
									required: 'Password is required',
									minLength: {
										value: 5,
										message: 'Minimum 5 characters'
									}
								}}
								type='password'
								placeholder='Enter password'
							/>
						</div>

						<FormBtn
							text={'SignUp'}
							type={'submit'}
							fontSize={'18px'}
							pInline={'20px'}
							padding={'10px'}
							width={'100%'}
						/>
					</form>
				</main>
			</div>
		</div>
	)
}

export default Auth
