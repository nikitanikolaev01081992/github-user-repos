import BaseDataStore from '../BaseDataStore/BaseDataStore';
import ICommit from '../../models/ICommit';
import githubService from '../../services/GithubService/GithubService';

// ====================================================================================================================
class CommitsStore extends BaseDataStore<ICommit[]> {
	async requestCommitsOfRepo(repoId: number) {
		const repoData = this.rootStore.reposStore.getRepoById(repoId);

		if (!repoData) {
			return Promise.reject('Не найден репозиторий во внутреннем хранилище');
		}

		const { commits_url: commitsUrl } = repoData;
		const url = commitsUrl.replace('{/sha}', '');

		this.setState({ isLoading: true });

		try {
			const data = await githubService.requestCommits(url);
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
export default CommitsStore;
