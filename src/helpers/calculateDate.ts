import { TMessage } from 'types/types'

export const CalculateDate = (message: TMessage) => {
	const currentDate = new Date()

	const messageDate = new Date(
		message.date.seconds * 1000 + message.date.nanoseconds / 1000000
	)

	const isSameDate = messageDate.toDateString() === currentDate.toDateString()

	let formattedDate: string

	if (isSameDate) {
		formattedDate = messageDate.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		})
	} else {
		formattedDate = messageDate.toLocaleDateString([], {
			day: 'numeric',
			month: 'short'
		})
	}

	return formattedDate
}
