export default class Authentication {

    /**
     * Check if there is an active session
     * @returns {boolean}
     */
    static isAuthenticated () {
        console.log(localStorage.getItem('userType'))
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('user_id'));
        console.log(localStorage.getItem('username'));
        return localStorage.getItem('token');
    }

    static async logout() {
        localStorage.clear();
    }
}