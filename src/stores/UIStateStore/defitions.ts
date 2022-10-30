export enum UIPage {
	LOGIN,
	PROFILE,
	COMMITS,
}

export interface IState {
	currentPage: UIPage;
}
