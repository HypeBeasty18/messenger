import { DocumentData } from 'firebase/firestore'

export type TDataInput = {
	username: string
	password: string
}

export type TMessage = {
	name: string
	lastMessage: string
	img: string
	isOnline: boolean
	isPinned: boolean
}

export type TUser = {
	user: DocumentData
}

export type TInputMessage = {
	message: string
	file?: File
	image?: File
}

export interface Chat {
	userInfo: {
		uid:string
		photoURL: string
		displayName: string
		lastMessage?: {
			text: string
		}
	}
	date: number
}

export type TUserSelect = {
	uid:string
	photoURL: string
	displayName: string
	lastMessage?: {
		text: string
	}
}