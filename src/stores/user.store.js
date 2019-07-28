import { observable, action } from 'mobx';
import { createContext } from 'react';

class UserStore {
	@observable user = {
		phone: '',
		identity: '',
		avatar: '',
		isLogin: false
	};

	@action authorize = payload => ({ ...this.user, ...payload });
}

const UserStoreContext = createContext(new UserStore());

export default UserStoreContext;
