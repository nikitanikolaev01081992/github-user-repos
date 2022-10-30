import { useContext } from 'react';
import RootStoreContext from '../../context/RootStoreContext';
import { observer } from 'mobx-react-lite';

// ====================================================================================================================
const UserInfo = observer(() => {
	const { userStore } = useContext(RootStoreContext);

	const { login, name, avatar_url: avatarUrl } = userStore.getData() ?? {};

	return (
		<div className='flex gap-2 items-center w-full h-40 shadow-[0_0_2px_0_rgba(0,0,0,0.5)]'>
			<img className='' src={avatarUrl} alt={`Аватарка пользователя ${login}`} width='160' height='160' />
			<div>
				<p>Логин/имя: </p>
				<p className='font-bold'>{`${login}/${name ?? '<Нет имени>'}`}</p>
			</div>
		</div>
	);
});

// ====================================================================================================================
export default UserInfo;
