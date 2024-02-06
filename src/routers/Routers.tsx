import NotFound from 'components/pages/notFound/NotFound'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebaseConfig/firebase'
import { FC, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { routers } from './routers.data'

const Routers: FC = () => {
	const [isAuth, setISAuth] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			if (auth.currentUser?.uid) {
				setISAuth(true)
			} else {
				setISAuth(false)
			}
		})
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
