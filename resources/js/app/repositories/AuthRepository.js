import { Repository } from './Base/Repository'


class AuthRepository extends Repository {
    endpoint = ''

    login(email, password) {
        return this.$axios.post(`login`, {
            email,
            password,
        });
    }
}

export default new AuthRepository()
