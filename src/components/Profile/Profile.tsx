import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import RootStoreContext from '../../context/RootStoreContext';
import { UIPage } from '../../stores/UIStateStore/defitions';
import BackButton from '../BackButton/BackButton';
import ReposTable from '../ReposTable/ReposTable';
import UserInfo from '../UserInfo/UserInfo';

// ====================================================================================================================
const Profile = observer(() => {
	const { uiStateStore } = useContext(RootStoreContext);

	return (
		<div className='min-h-screen w-full flex flex-col items-start gap-3'>
			<BackButton handleClick={() => uiStateStore.setNewState({ currentPage: UIPage.LOGIN })}></BackButton>
			<UserInfo></UserInfo>
			<ReposTable></ReposTable>
		</div>
	);
});

// ====================================================================================================================
export default Profile;
