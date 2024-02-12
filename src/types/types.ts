export type TDataInput = {
	username: string
	password: string
}

export type TMessage = {
	date: number
	id: string
	senderId: string
	text: string
	img?:string
}

export type TUser = {
	displayName: string
	photoURL: string
	uid: string
	username: string
}

export type TInputMessage = {
	message: string
	file?: File
	image?: File
}

export interface Chat {
	userInfo: {
		uid: string
		photoURL: string
		displayName: string
	}
	date: number
	lastMessage?: {
		text: string
	}
	isPinned?: boolean
}

export type TUserSelect = {
	uid: string
	photoURL: string
	displayName: string
	lastMessage?: {
		text: string
	}
}
