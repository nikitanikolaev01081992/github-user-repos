import BaseDataStore from '../BaseDataStore/BaseDataStore';
import IUSer from '../../models/IUser';
import githubService from '../../services/GithubService/GithubService';

// ====================================================================================================================
class UserStore extends BaseDataStore<IUSer> {
	async requestUserByLogin(login: string) {
		this.setState({ isLoading: true, errorMessage: '' });

		try {
			const data = await githubService.requestUserByLogin(login);
			this.setData(data);

			return this.getData();
		} catch (error: any) {
			this.setState({ errorMessage: error });

			return Promise.reject(error);
		} finally {
			this.setState({ isLoading: false });
		}
	}
}

// ====================================================================================================================
export default UserStore;
