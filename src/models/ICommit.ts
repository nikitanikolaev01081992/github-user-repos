export default interface ICommit {
	sha: string;
	commit: {
		author: {
			name: string;
			date: string;
		};
	};
}
