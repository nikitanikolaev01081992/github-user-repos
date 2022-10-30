import IRepo from '../../models/IRepo';

// ====================================================================================================================
const RepoItem = ({ id, name, language, description, stargazers_count: stargazersCount }: IRepo) => {
	return (
		<tr className='cursor-pointer hover:bg-slate-200' data-repo-id={id}>
			<td className='border border-slate-400 p-2'>{name}</td>
			<td className='border border-slate-400 p-2'>{language ?? '<Нет языка>'}</td>
			<td className='border border-slate-400 p-2'>{description ?? '<Нет описания>'}</td>
			<td className='border border-slate-400 p-2'>{stargazersCount}</td>
		</tr>
	);
};

// ====================================================================================================================
export default RepoItem;
