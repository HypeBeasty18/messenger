import { useOnClickOutside } from 'hooks/useOnClickOutside'
import React, { FC, useState } from 'react'
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
	setIsFinded(isShow)
	return (
		<div className={s.container} ref={ref}>
			<div className={s.inputSearch}>
				<CiSearch className={s.searchIcon} />
				<input placeholder='Search' onChange={e => setValue(e.target.value)} />
			</div>
			{isShow && !err ? (
				<PopUpSearch users={users} />
			) : (
				err && <span>Error</span>
			)}
		</div>
	)
}

export default SearchInput
