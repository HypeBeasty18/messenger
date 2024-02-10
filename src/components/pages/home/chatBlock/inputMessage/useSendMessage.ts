import { useMemo, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TInputMessage } from 'types/types'

export const useSendMessage = () => {
	const filesRef = useRef<File[] | null>(null)

	const { register, handleSubmit, reset } = useForm<TInputMessage>({
		mode: 'onSubmit'
	})

	const onSubmit: SubmitHandler<TInputMessage> = async userData => {
		console.log(userData, filesRef)
		reset()
		filesRef.current = null
	}

	return useMemo(() => ({ handleSubmit, onSubmit, register, filesRef }), [])
}
