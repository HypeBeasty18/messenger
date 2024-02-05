import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { routers } from './routers.data'
import NotFound from 'components/pages/notFound/NotFound'

type Props = {}

const Routers: React.FC = (props: Props) => {
	const [isAuth, setISAuth] = useState(true)

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
