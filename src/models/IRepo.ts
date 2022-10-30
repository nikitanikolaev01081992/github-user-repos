export default interface IRepo {
	id: number;
	name: string;
	language: string | null;
	description: string | null;
	stargazers_count: number;
	commits_url: string;
}
