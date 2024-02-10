import { useOnClickOutside } from 'hooks/useOnClickOutside'
import React, { FC, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

import s from './SearchInput.module.scss'
import PopUpSearch from './popUpSearch/PopUpSearch'
import { useSearchInput } from './useSearchInput'

interface Props {
	setIsFinded: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInput: FC<Props> = ({ setIsFinded }) => {
	const [value, setValue] = useState<string>('')
	const { ref, isShow, setIsShow } = useOnClickOutside({
		isInitialValue: false
	})
	const { users, err } = useSearchInput({ value, setIsShow })

	useEffect(() => {
		setIsFinded(isShow)
	}, [isShow, setIsFinded])

	return (
		<div className={s.container} ref={ref}>
			<div className={s.inputSearch}>
				<CiSearch className={s.searchIcon} />
				<input
					placeholder='Search'
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
			{isShow && !err ? (
				<div className={s.listCont}>
					<ul>
						{users.map(user => (
							<li key={user.displayName}>
								<PopUpSearch user={user} setValue={setValue} />
							</li>
						))}
					</ul>
				</div>
			) : (
				err && <span>Error</span>
			)}
		</div>
	)
}

export default SearchInput
