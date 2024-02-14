import { FC } from 'react'

type Props = {
	img: string
	size: string
}

const Avatar: FC<Props> = ({ img, size }) => {
	return (
		<img
			className={`w-[${size}px] h-[${size}px] rounded-full object-cover`}
			src={img ? img : 'icon'}
		/>
	)
}

export default Avatar
