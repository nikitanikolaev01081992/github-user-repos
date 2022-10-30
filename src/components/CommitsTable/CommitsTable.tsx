import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import RootStoreContext from '../../context/RootStoreContext';
import { UIPage } from '../../stores/UIStateStore/defitions';
import ICommit from '../../models/ICommit';
import CommitItem from '../CommitItem/CommitItem';
import BackButton from '../BackButton/BackButton';

// ====================================================================================================================
const COLS_NUMBER = 3;

// ====================================================================================================================
function getCommitsItems(commits: ICommit[]) {
	return commits.length > 0 ? (
		commits.map((commit) => <CommitItem {...commit} key={commit.sha}></CommitItem>)
	) : (
		<tr>
			<td colSpan={COLS_NUMBER}>{'<Нет коммитов>'}</td>
		</tr>
	);
}

// ====================================================================================================================
function getContent(commits: ICommit[], errorMsg: string, isLoading: boolean) {
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

	return getCommitsItems(commits);
}

// ====================================================================================================================
const CommitsTable = observer(() => {
	const { commitsStore, uiStateStore } = useContext(RootStoreContext);
	const commits = commitsStore.getData() ?? [];
	const { isLoading = false, errorMessage = '' } = commitsStore.getState();

	return (
		<div className='min-h-screen w-full flex flex-col items-start gap-3'>
			<BackButton handleClick={() => uiStateStore.setNewState({ currentPage: UIPage.PROFILE })}></BackButton>
			<table className='w-full rounded-sm border-collapse text-center shadow-[0_0_2px_0_rgba(0,0,0,0.5)]'>
				<thead>
					<tr>
						<th className='border border-slate-400 p-2' scope='col'>
							Автор
						</th>
						<th className='border border-slate-400 p-2' scope='col'>
							Хэш коммита
						</th>
						<th className='border border-slate-400 p-2' scope='col'>
							Дата
						</th>
					</tr>
				</thead>
				<tbody>{getContent(commits, errorMessage, isLoading)}</tbody>
			</table>
		</div>
	);
});

// ====================================================================================================================
export default CommitsTable;
