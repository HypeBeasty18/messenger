import { createSlice } from '@reduxjs/toolkit'
import { auth } from 'firebaseConfig/firebase'

interface currentChat {
	chatId: string | null
	user: {
		uid: string
		photoURL: string
		displayName: string
	} | null
}

const initialState: currentChat = {
	chatId: null,
	user: null
}

const authSlice = createSlice({
	name: 'currentChat',
	initialState,
	reducers: {
		saveCurrentChat(state, action) {
			if (auth.currentUser) {
				state.user = action.payload
				state.chatId =
					auth.currentUser.uid > action.payload.uid
						? auth.currentUser.uid + action.payload.uid
						: action.payload.uid + auth.currentUser.uid
			}
		},
		removeCurrentChat(state) {
			state.chatId = null
			state.user = null
		}
	}
})

export const { saveCurrentChat, removeCurrentChat } = authSlice.actions

export default authSlice.reducer
