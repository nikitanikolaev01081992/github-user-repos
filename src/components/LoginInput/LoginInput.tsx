import { FormEvent, useContext, useState } from 'react';
import RootStoreContext from '../../context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { UIPage } from '../../stores/UIStateStore/defitions';

// ====================================================================================================================
const LoginInput = observer(() => {
	const { userStore, reposStore, uiStateStore } = useContext(RootStoreContext);
	const { isLoading, errorMessage } = userStore.getState();
	const [login, setLogin] = useState('');
	const [wasModifed, setWasModifed] = useState(false);

	const showError = errorMessage && !wasModifed;

	const handleInputSubmit = async (evt: FormEvent) => {
		evt.preventDefault();

		setWasModifed(false);

		try {
			await userStore.requestUserByLogin(login);

			// вероятно стоит сделать автоматическую загрузку репозиториев после появления логина
			reposStore.requestReposOfUser();
			uiStateStore.setNewState({ currentPage: UIPage.PROFILE });
		} catch (_) {}
	};

	return (
		<form className='relative' action='' onSubmit={handleInputSubmit}>
			{showError ? (
				<p className='absolute left-2 -top-6 h-6 w-5/6 truncate text-rose-600 font-bold'>{errorMessage}</p>
			) : (
				<></>
			)}
			<div className='flex items-center rounded-full border-solid border-2 border-amber-300 p-2'>
				<input
					className='w-80 focus-visible:outline-none'
					type='text'
					name='login-input'
					id='login-input'
					required
					placeholder='Поиск данных по логину'
					value={login}
					onInput={(evt) => {
						const target = evt.target as HTMLInputElement;

						setWasModifed(true);
						setLogin(target.value);
					}}
				/>
				<div className='flex items-center gap-1'>
					<button
						className='hover:text-slate-400'
						type='button'
						onClick={() => {
							setWasModifed(true);
							setLogin('');
						}}
					>
						{/* неплохо бы вынести в отдельный файл */}
						<svg viewBox='0 0 32 32' width='32' height='32' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M23.66 6.96 16 14.63 8.32 6.96 6.95 8.33 14.62 16l-7.67 7.67 1.37 1.37 7.67-7.68 7.67 7.68 1.37-1.37L17.36 16l7.67-7.67-1.37-1.37Z'
								fill='inherit'
							></path>
						</svg>
					</button>
					<button
						className='rounded-full bg-yellow-400 px-3 py-1 hover:bg-yellow-300'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? 'Загрузка' : 'Найти'}
					</button>
				</div>
			</div>
		</form>
	);
});

// ====================================================================================================================
export default LoginInput;
