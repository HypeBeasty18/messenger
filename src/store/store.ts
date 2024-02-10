import { configureStore } from "@reduxjs/toolkit";

import authReducer from './authSlice'
import messagesReducer from './messagesSlice'
import currentChatReducer from './currentChatSlice'
// import themeReducer from './themeSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    currentChat: currentChatReducer,
    // theme: themeReducer,
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch