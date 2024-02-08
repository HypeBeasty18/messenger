import Layout from 'components/layout/Layout'
import { useAuth } from 'hooks/useAuth'
import React from 'react'

type Props = {}

const Home = (props: Props) => {


  const {handleLogout} = useAuth()

	return (
		<Layout>
			<button onClick={() => handleLogout()}>Logout</button>
		</Layout>
	)
}

export default Home
