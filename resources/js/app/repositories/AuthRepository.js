import { Repository } from './Base/Repository'


class AuthRepository extends Repository {
    endpoint = ''

    login(email, password) {
        return this.$axios.post(`login`, {
            email,
            password,
        });
    }

    register(data) {
        return this.$axios.post(`register`, data);
    }
}

export default new AuthRepository()
