import LayoutGuest from 'components/layoutGuest/LayoutGuest'
import FormBtn from 'components/ui/formBtn/FormBtn'
import InputData from 'components/ui/inputData/InputData'
import { useAuth } from 'hooks/useAuth'
import { FC } from 'react'

import s from './Auth.module.scss'

const Auth: FC = () => {
	const {
		setType,
		register,
		handleSubmit,
		onSubmit,
		errors,
		error,
		handleGoogle
	} = useAuth()

	return (
		<LayoutGuest>
			<div className={s.container}>
				<h3>Welcome!</h3>
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
					{error && <span className='errorData'>{error}</span>}

					<div className={s.buttonCont}>
						<FormBtn
							text={'LogIn'}
							type={'submit'}
							fontSize={'18px'}
							pInline={'20px'}
							padding={'10px'}
							width={'100%'}
							onClick={() => setType('login')}
						/>
						<FormBtn
							text={'SignUp'}
							type={'submit'}
							fontSize={'18px'}
							pInline={'20px'}
							padding={'10px'}
							width={'100%'}
							onClick={() => setType('signup')}
						/>
					</div>
				</form>
				<span className={s.divide}>or</span>
				<button className={s.googleButton} onClick={handleGoogle}>
					<span>Log in with Google</span>
				</button>
			</div>
		</LayoutGuest>
	)
}

export default Auth
