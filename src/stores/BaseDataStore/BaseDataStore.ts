import { makeObservable, observable, action } from 'mobx';
import IStoreState from '../../models/IStoreState';
import RootStore from '../RootStore';

// ====================================================================================================================
abstract class BaseDataStore<DataType = any> {
	protected data: DataType | undefined;
	protected state: IStoreState = { isLoading: false, errorMessage: '' };
	protected rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		makeObservable<this, 'data' | 'setData' | 'state' | 'setState'>(this, {
			data: observable,
			state: observable,
			setData: action,
			setState: action,
		});
	}

	getData(): DataType | undefined {
		return this.data;
	}

	getState() {
		return this.state;
	}

	protected setData(data: DataType) {
		this.data = data;
	}

	protected setState(newState: IStoreState) {
		const { isLoading = this.state.isLoading, errorMessage = this.state.errorMessage } = newState;

		this.state = { isLoading, errorMessage };
	}
}

// ====================================================================================================================
export default BaseDataStore;
