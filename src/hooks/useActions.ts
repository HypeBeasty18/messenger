import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import * as authActions from 'store/authSlice'
import * as messagesActions from 'store/messagesSlice'
import * as currentChatActions from 'store/currentChatSlice'
import { AppDispatch, RootState } from 'store/store'
// import * as themeActions from 'store/themeSlice'

const rootActions = {
	...authActions,
	...messagesActions,
	...currentChatActions
	// ...themeActions
}

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>()

	return useMemo(() => {
		return bindActionCreators(rootActions, dispatch)
	}, [dispatch])
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
