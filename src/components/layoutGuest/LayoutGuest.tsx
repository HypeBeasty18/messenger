import React, { FC } from 'react'

import s from './LayoutGuest.module.scss'

type Props = {
	children: React.ReactNode
}

const LayoutGuest: FC<Props> = ({ children }) => {
	return (
		<div className={s.container}>
			<div className={s.inner}>
				<header>
					<img src='/src/assets/icons/logo.png' draggable={false} />
				</header>
        <main>
          {children}
        </main>
			</div>
		</div>
	)
}

export default LayoutGuest
