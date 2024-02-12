import {  useAppSelector } from 'hooks/useActions'
import { FC, useState } from 'react'
import { PiNotePencil } from 'react-icons/pi'

import s from './SideBar.module.scss'
import AllMessages from './allMessages/AllMessages'
import PinnedMessage from './pinnedMesssage/PinnedMessage'
import SearchInput from './searchInput/SearchInput'
import { useSideBar } from './useSideBar'

const SideBar: FC = () => {
	const [isFinded, setIsFinded] = useState<boolean>(false)

	const messages = useAppSelector(state => state.messages)
	useSideBar()

	return (
		<div className={s.container}>
			<div className={s.upInner}>
				<div className={s.header}>
					<h2>
						Messages{' '}
						<span>({messages ? Object.entries(messages).length : 0})</span>
					</h2>
					<button>
						<PiNotePencil className={s.createIcon} />
					</button>
				</div>
				<SearchInput setIsFinded={setIsFinded} />
			</div>
			{!isFinded && (
				<>
					<PinnedMessage />
					<AllMessages />
				</>
			)}
		</div>
	)
}

export default SideBar
