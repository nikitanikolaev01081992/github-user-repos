import { useContext } from 'react';
import CommitsTable from './components/CommitsTable/CommitsTable';
import LoginInput from './components/LoginInput/LoginInput';
import RootStoreContext from './context/RootStoreContext';
import { UIPage } from './stores/UIStateStore/defitions';
import { observer } from 'mobx-react-lite';
import Profile from './components/Profile/Profile';

// ====================================================================================================================
function getContent(page: UIPage) {
	switch (page) {
		case UIPage.COMMITS:
			return <CommitsTable></CommitsTable>;
		case UIPage.PROFILE:
			return <Profile></Profile>;
		default:
			return <LoginInput></LoginInput>;
	}
}

// ====================================================================================================================
const App = observer(() => {
	const { uiStateStore } = useContext(RootStoreContext);
	const { currentPage } = uiStateStore.getCurrentState();

	return <div className='w-full min-h-screen flex items-center justify-center p-3'>{getContent(currentPage)}</div>;
});

// ====================================================================================================================
export default App;
