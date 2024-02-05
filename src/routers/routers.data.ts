import Auth from 'components/pages/auth/Auth'
import Home from 'components/pages/home/Home'
import Profile from 'components/pages/profile/Profile'

export const routers = [
	{
		path: '/',
		component: Home,
		isAuth: true
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/profile/:id',
		component: Profile,
		isAuth: true
	}
]
