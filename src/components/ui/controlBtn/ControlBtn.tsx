import clsx from 'clsx'
import React, { FC } from 'react'
import {
	LuGamepad2,
	LuLayoutDashboard,
	LuMessagesSquare,
	LuPhone,
	LuUsers
} from 'react-icons/lu'
import {
	MdOutlineNotificationsNone,
	MdOutlineVideoLibrary
} from 'react-icons/md'

import SettingsBtn from '../settingsBtn/SettingsBtn'

import s from './ControlBtn.module.scss'

type Props = {
	userControl: {
		name: string
		icon: string
	}
}

const ControlBtn: FC<Props> = ({ userControl }) => {
	const IconComponent = getIconComponent(userControl.icon)

	return <>{IconComponent && <IconComponent className={s.icon} />}</>
}

const getIconComponent = (iconName: string) => {
	switch (iconName) {
		case 'LuLayoutDashboard':
			return LuLayoutDashboard
		case 'LuMessagesSquare':
			return LuMessagesSquare
		case 'LuPhone':
			return LuPhone
		case 'LuUsers':
			return LuUsers
		case 'MdOutlineNotificationsNone':
			return MdOutlineNotificationsNone
		case 'MdOutlineVideoLibrary':
			return MdOutlineVideoLibrary
		case 'LuGamepad2':
			return LuGamepad2
		case 'LuSettings':
			return SettingsBtn
		default:
			return null
	}
}

export default ControlBtn
