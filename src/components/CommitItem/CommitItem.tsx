import ICommit from '../../models/ICommit';

// ====================================================================================================================
const CommitItem = ({ sha, commit }: ICommit) => {
	const { name: author, date } = commit.author;

	return (
		<tr data-commit-id={sha}>
			<td className='border border-slate-400 p-2'>{author}</td>
			<td className='border border-slate-400 p-2'>{sha}</td>
			<td className='border border-slate-400 p-2'>{date}</td>
		</tr>
	);
};

// ====================================================================================================================
export default CommitItem;
