import { IBackButtonProps } from './definitions';

export default function BackButton({ handleClick }: IBackButtonProps) {
	return (
		<button
			className='max-w-fit rounded-full bg-yellow-400 px-3 py-1 hover:bg-yellow-300'
			type='button'
			onClick={() => handleClick()}
		>
			Назад
		</button>
	);
}
