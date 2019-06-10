import store from './../redux/store';
import { clearUserState } from "./../redux/actions/user";

export default class Authentication {

    /**
     * Check if there is an active session
     * @returns {boolean}
     */
    static isAuthenticated () {
        return !!localStorage.getItem('sessionId');
    }

    static async logout() {
        localStorage.clear();
        store.dispatch(clearUserState());
    }
}