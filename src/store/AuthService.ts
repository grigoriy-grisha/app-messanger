import {action, makeAutoObservable, observable} from "mobx";
import {http} from "../utils/Http";

class AuthService {
    isAuth: boolean = !!window.localStorage.token;
    token: string = window.localStorage.token;
    id: string = window.localStorage.id;
    constructor() {
        makeAutoObservable(this)
    }

    async registerAction(body: object) {
        const response = await http.post("/user/signup", body);
        if (response.ok) return response.json();

        return response;
    }


    async setUserFetchAction(token: string, id: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        this.token = token;
        this.id = id
        this.isAuth = true;
    }


    async loginAction(body: object) {
        const response = await http.post("/user/signin", body);
        if (response.ok) {
            const result: any = await response.json();

            this.setUserFetchAction(result.token, result._id);
            return result;
        }

        return response.json();
    }
}


export default new AuthService();
