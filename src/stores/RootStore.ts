import CommitsStore from './CommitsStore/CommitsStore';
import ReposStore from './ReposStore/ReposStore';
import UIStateStore from './UIStateStore/UIStateStore';
import UserStore from './UserStore/UserStore';

// ====================================================================================================================
class RootStore {
	private static instance: RootStore;
	userStore: UserStore;
	reposStore: ReposStore;
	commitsStore: CommitsStore;
	uiStateStore: UIStateStore;

	private constructor() {
		this.userStore = new UserStore(this);
		this.reposStore = new ReposStore(this);
		this.commitsStore = new CommitsStore(this);
		this.uiStateStore = new UIStateStore();
	}

	static getInstance(): RootStore {
		if (!RootStore.instance) {
			RootStore.instance = new RootStore();
		}

		return RootStore.instance;
	}
}

// ====================================================================================================================
export default RootStore;
