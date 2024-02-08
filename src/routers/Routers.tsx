import NotFound from 'components/pages/notFound/NotFound'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { routers } from './routers.data'
import { useAppSelector } from 'hooks/useActions'

const Routers: FC = () => {
	const isAuth = useAppSelector(state => state.auth.isAuth)

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
