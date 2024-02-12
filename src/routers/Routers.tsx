import NotFound from 'components/pages/notFound/NotFound'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebaseConfig/firebase'
import { useActions, useAppSelector } from 'hooks/useActions'
import { FC, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { routers } from './routers.data'

const Routers: FC = () => {
	const isAuth = useAppSelector(state => state.auth.isAuth)

	const actions = useActions()

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, user => {
			if (user) {
				actions.login()
				
			} else {
				actions.logout()
				actions.removeCurrentChat()
				actions.removeMessages()
			}
		})
		return () => {
			unsub()
		}
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				{routers.map(router => (
					<Route
						key={router.path}
						path={router.path}
						element={
							router.isAuth && !isAuth ? (
								<Navigate to='/auth' />
							) : (
								<router.component />
							)
						}
					/>
				))}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Routers
