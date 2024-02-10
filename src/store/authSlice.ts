import { createSlice } from '@reduxjs/toolkit'
import { AUTH } from 'constants/app.constants'
import Cookies from 'js-cookie'

type State = {
	isAuth: boolean

}

const initialValue = Cookies.get(AUTH) || false

const initialState: State = {
	isAuth: initialValue,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.isAuth = true

			Cookies.set(AUTH, true)
		},

		logout(state) {
			state.isAuth = false
			Cookies.remove(AUTH)
		}
	}
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
