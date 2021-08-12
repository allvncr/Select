import http from "../http-common";

class Service {
    getAll() {
        return http.get("pokemon/?offset=20&limit=30");
    }
}

export default new Service();
