import 'assets/styles/indes.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Routers from 'routers/Routers'
import store from 'store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Routers />
		</Provider>
	</React.StrictMode>
)
