import s from './FormBtn.module.scss'

type Props = {
	text: string
	type: 'button' | 'submit' | 'reset'
	fontSize?: string
	pInline?: string
	padding?: string
	width?: string
	onClick?: () => void
}

const FormBtn = (props: Props) => {
	return (
		<button
			className={s.container}
			type={props.type}
			style={{
				fontSize: `${props.fontSize}`,
				padding: `${props.padding}`,
				paddingInline: `${props.pInline}`,
				width: `${props.width}`
			}}
			onClick={props.onClick}
		>
			{props.text}
		</button>
	)
}

export default FormBtn