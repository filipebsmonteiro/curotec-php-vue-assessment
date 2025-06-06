import { axiosWithAuth } from '../../providers/AxiosProvider';

export class Repository {
    constructor($axios = axiosWithAuth) {
        this.$axios = $axios;
        this.endpoint = null;
    }

    fetchAll(params = {}) {
        return this.$axios
            .useBearerToken()
            .get(`${this.endpoint}`, { params });
    }

    fetch(id) {
        return this.$axios
            .useBearerToken()
            .get(`${this.endpoint}/${id}`);
    }

    create(data) {
        return this.$axios
            .useBearerToken()
            .post(`${this.endpoint}`, data);
    }

    update(id, data) {
        return this.$axios
            .useBearerToken()
            .put(`${this.endpoint}/${id}`, data);
    }

    delete(id) {
        return this.$axios
            .useBearerToken()
            .delete(`${this.endpoint}/${id}`);
    }
}
