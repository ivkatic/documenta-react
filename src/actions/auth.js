import axios from 'axios';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = (username, password) => {
  return () => {
    return axios({
        method: 'post',
        url: 'http://localhost/dx-server/ajax-handler/',
        data: {
            action: 'doLogin',
            formData: {username:username, password:password}
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response);
        return response;
    })
    .catch(function (error) {
        console.log(error);
        return error;
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return true;
  };
};

class DX_Auth {
    constructor() {
        this.url = 'https://oldcrm.am2studio.com/wp-json/jwt-auth/v1/token';
        this.validateUrl = 'https://oldcrm.am2studio.com/wp-json/jwt-auth/v1/token/validate';
        this.permissionsUrl = 'https://oldcrm.am2studio.com/wp-json/crm/v2/permissions';
        this.tokenKey = 'crmTokenKey';
        this.userName = 'crmUserName';
        this.permissions = 'permissions';
    }

    getSessionToken = () => sessionStorage.getItem(this.tokenKey);

    getPermissions = () => (sessionStorage.getItem(this.permissions) ? sessionStorage.getItem(this.permissions) : '');

    removeSessionToken = () => {
        localStorage.clear();
        sessionStorage.clear();
    };

    /* Used for private routes */
    isAuthenticated = () => {
        if (this.getSessionToken() === null) {
            return false;
        }
        return axios({
            method: 'post',
            url: this.validateUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.getSessionToken()}`
            }
        })
            .then(() => true)
            .catch(error => {
                console.log(error);
                this.removeSessionToken(); // if session has expired, remove it
                return false;
            });
    };

    /* Login */
    authenticate(username, password) {
        return axios({
            method: 'post',
            url: 'http://localhost/dx-server/ajax-handler/',
            data: {
                action: 'doLogin',
                formData: {username:username, password:password}
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
}

//export default DX_Auth;
  