import { createSlice } from '@reduxjs/toolkit'
import { auth } from 'firebaseConfig/firebase'

interface currentChat {
	chatId: string | null
	user: {
		uid: string
		photoURL: string
		displayName: string
	}
}

const initialState: currentChat = {
	chatId: null,
	user: {
		uid: '',
		photoURL: '',
		displayName: ''
	}
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
        console.log(state.user, state.chatId);
        
			}
		},

	}
})

export const { saveCurrentChat } = authSlice.actions

export default authSlice.reducer
