import { observable, action } from 'mobx';
import { createContext } from 'react';

class UserStore {
	@observable user = {
		phone: '',
		identity: '',
		avatar: '',
		isLogin: false
	};

	@action updateUser = payload => (this.user = { ...this.user, ...payload });
}

const UserStoreContext = createContext(new UserStore());

export default UserStoreContext;
