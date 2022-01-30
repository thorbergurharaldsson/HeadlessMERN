import { makeAutoObservable } from "mobx";

class userStore {
	name = process.env.REACT_APP_USER;
	id = process.env.REACT_APP_USER_ID;

	constructor() {
		makeAutoObservable(this);
	}

	setUserName = (name, id) => {
		this.name = name;
		this.id = id;
	};
}

export default userStore;
