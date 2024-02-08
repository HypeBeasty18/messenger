import { FC, useState } from 'react'
import { PiNotePencil } from 'react-icons/pi'

import s from './SideBar.module.scss'
import AllMessages from './allMessages/AllMessages'
import { messages } from './messages.list'
import PinnedMessage from './pinnedMesssage/PinnedMessage'
import SearchInput from './ui/searchInput/SearchInput'

const SideBar: FC = () => {
	const [isFinded, setIsFinded] = useState<boolean>(false)

	return (
		<div className={s.container}>
			<div className={s.upInner}>
				<div className={s.header}>
					<h2>
						Messages <span>({messages.length})</span>
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
