import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Chat } from 'types/types'

interface State {
	[key: string]: Chat
}

const initialState: State = {}

const authSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		saveMessages(state, action: PayloadAction<{ [key: string]: Chat }>) {
			return action.payload
		}
	}
})

export const { saveMessages } = authSlice.actions

export default authSlice.reducer
