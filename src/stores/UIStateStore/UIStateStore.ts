import { IState, UIPage } from './defitions';
import { makeObservable, observable, action } from 'mobx';

// ====================================================================================================================
class UIStateStore {
	private state: IState = { currentPage: UIPage.LOGIN };

	constructor() {
		makeObservable<this, 'state'>(this, {
			state: observable,
			setNewState: action,
		});
	}

	setNewState(state: IState) {
		this.state = state;
	}

	getCurrentState(): IState {
		return this.state;
	}
}

// ====================================================================================================================
export default UIStateStore;
