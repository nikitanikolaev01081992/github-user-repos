import ICommit from '../../models/ICommit';
import { normalizeDateString } from '../../utils/utils';

// ====================================================================================================================
const CommitItem = ({ sha, commit }: ICommit) => {
	const { name: author, date } = commit.author;

	return (
		<tr data-commit-id={sha}>
			<td className='border border-slate-400 p-2'>{author}</td>
			<td className='border border-slate-400 p-2'>{sha}</td>
			<td className='border border-slate-400 p-2'>{normalizeDateString(date)}</td>
		</tr>
	);
};

// ====================================================================================================================
export default CommitItem;
