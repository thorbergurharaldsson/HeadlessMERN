import React from "react";

import UserStore from "./user.store";

class RootStore {
	constructor() {
		this.userStore = new UserStore(this);
	}
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
