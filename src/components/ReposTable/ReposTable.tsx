import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import RootStoreContext from '../../context/RootStoreContext';
import RepoItem from '../RepoItem/RepoItem';
import IRepo from '../../models/IRepo';
import { UIPage } from '../../stores/UIStateStore/defitions';

// ====================================================================================================================
const COLS_NUMBER = 4;

const REPO_ID_ATTR = 'data-repo-id';

// ====================================================================================================================
function getRepoItems(repos: IRepo[]) {
	return repos.length > 0 ? (
		repos.map((repo) => <RepoItem {...repo} key={repo.id}></RepoItem>)
	) : (
		<tr>
			<td colSpan={COLS_NUMBER}>{'<Нет публичных репозиториев>'}</td>
		</tr>
	);
}

// ====================================================================================================================
function getReposContent(repos: IRepo[], errorMsg: string, isLoading: boolean) {
	if (errorMsg) {
		return (
			<tr>
				<td colSpan={COLS_NUMBER}>{errorMsg}</td>
			</tr>
		);
	} else if (isLoading) {
		return (
			<tr>
				<td colSpan={COLS_NUMBER}>Загрузка...</td>
			</tr>
		);
	}

	return getRepoItems(repos);
}

// ====================================================================================================================
const ReposTable = observer(() => {
	const { reposStore, commitsStore, uiStateStore } = useContext(RootStoreContext);
	const repos = reposStore.getData() ?? [];
	const { isLoading = false, errorMessage = '' } = reposStore.getState();

	const handleRepoClick = (evt: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
		const target = (evt.target as HTMLElement).closest('tr');

		if (!target || !target.hasAttribute(REPO_ID_ATTR)) {
			return;
		}

		const repoId = Number(target.getAttribute(REPO_ID_ATTR)) || -1;

		commitsStore.requestCommitsOfRepo(repoId);
		uiStateStore.setNewState({ currentPage: UIPage.COMMITS });
	};

	return (
		<table className='w-full rounded-sm border-collapse text-center shadow-[0_0_2px_0_rgba(0,0,0,0.5)]'>
			<thead className=''>
				<tr>
					<th className='border border-slate-400 p-2' scope='col'>
						Наименование
					</th>
					<th className='border border-slate-400 p-2' scope='col'>
						Язык программирования
					</th>
					<th className='border border-slate-400 p-2' scope='col'>
						Описание
					</th>
					<th className='border border-slate-400 p-2' scope='col'>
						Количество звёзд
					</th>
				</tr>
			</thead>
			<tbody onClick={handleRepoClick}>{getReposContent(repos, errorMessage, isLoading)}</tbody>
		</table>
	);
});

// ====================================================================================================================
export default ReposTable;
