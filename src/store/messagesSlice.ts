import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import { Chat } from 'types/types'

export interface State {
	[key: string]: Chat
}

const initialState: State = {}

const authSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
    saveMessages(state, action: PayloadAction<{ [key: string]: Chat }>) {
      Object.keys(action.payload).forEach(key => {
        const chat = action.payload[key]
        if (chat.date instanceof Timestamp) {
          const timestamp = chat.date;
          chat.date = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);					
				}
      })
      return action.payload;
    },
		removeMessages(){
			return {}
		}
	}
})

export const { saveMessages, removeMessages } = authSlice.actions

export default authSlice.reducer
