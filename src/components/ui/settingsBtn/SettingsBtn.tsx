import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { FC } from 'react'
import { LuSettings } from 'react-icons/lu'

import PopUpProfileMe from '../poUpProfileMe/PopUpProfileMe'

import s from './SettingsBtn.module.scss'

type Props = {}

const SettingsBtn: FC = (props: Props) => {
	const { ref, isShow, setIsShow } = useOnClickOutside({
		isInitialValue: false
	})



	return (
		<>
			<button onClick={() => setIsShow(true)}>
				<LuSettings className={s.icon} />
			</button>
			{isShow && <PopUpProfileMe popUpRef={ref} setIsShow={setIsShow} />}
		</>
	)
}

export default SettingsBtn
