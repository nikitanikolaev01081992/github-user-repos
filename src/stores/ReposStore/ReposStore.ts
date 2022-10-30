import BaseDataStore from '../BaseDataStore/BaseDataStore';
import IRepo from '../../models/IRepo';
import githubService from '../../services/GithubService/GithubService';

// ====================================================================================================================
class ReposStore extends BaseDataStore<IRepo[]> {
	async requestReposOfUser() {
		const { repos_url: reposUrl = '' } = this.rootStore.userStore.getData() ?? {};

		this.setState({ isLoading: true });

		try {
			const data = await githubService.requestRepos(reposUrl);
			this.setData(data);

			return this.getData();
		} catch (error: any) {
			this.setState({ errorMessage: error });
			return Promise.reject(error);
		} finally {
			this.setState({ isLoading: false });
		}
	}

	getRepoById(repoId: number) {
		if (!this.data) {
			return undefined;
		}

		return this.data.find(({ id }) => id === repoId);
	}
}

// ====================================================================================================================
export default ReposStore;
