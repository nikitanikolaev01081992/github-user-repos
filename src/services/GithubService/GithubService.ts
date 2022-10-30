import ICommit from '../../models/ICommit';
import IRepo from '../../models/IRepo';
import IUSer from '../../models/IUser';
import { USER_URL } from './definitions';

// ====================================================================================================================
class GithubService {
	async requestUserByLogin(login: string): Promise<IUSer> {
		try {
			const response = await fetch(`${USER_URL}/${login}`);
			const { status, statusText } = response;

			// видимо стоит создать кастомный класс ошибок
			if (status === 404) {
				return Promise.reject('Нет такого пользователя');
			} else if (status !== 200) {
				const { message } = await response.json();
				return Promise.reject(`${status} ${message ?? statusText}`);
			}

			const user = await response.json();

			return user;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async requestRepos(url: string): Promise<IRepo[]> {
		return this.requestData<IRepo[]>(url);
	}

	async requestCommits(url: string): Promise<ICommit[]> {
		return this.requestData<ICommit[]>(url);
	}

	private async requestData<DataType>(url: string): Promise<DataType> {
		try {
			const response = await fetch(url);
			const { status, statusText } = response;

			if (status !== 200) {
				return Promise.reject(`${status} ${statusText}`);
			}

			const data = await response.json();

			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

// ====================================================================================================================
const githubService = new GithubService();

// ====================================================================================================================
export default githubService;
