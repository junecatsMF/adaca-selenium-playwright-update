export default class UserBuilder {
    constructor() {
        this.user = {
            username: '',
            password: ''
        };
    }

    withUsername(username) {
        this.user.username = username;
        return this;
    }

    withPassword(password) {
        this.user.password = password;
        return this;
    }

    build() {
        return this.user;
    }
}
