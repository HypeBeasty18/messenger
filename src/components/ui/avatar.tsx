import { FC } from 'react'

type Props = {
	img: string
	size: string
}

const Avatar: FC<Props> = ({ img, size }) => {
	return (
		<img
			className={`max-h-10 max-w-[${size}px] max-h-[${size}px]  rounded-full object-cover`}
			src={img ? img : 'icon'}
		/>
	)
}

export default Avatar
