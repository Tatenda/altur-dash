export class RegisterModel {
    first_name: string;
    last_name: string
    email: string;
    username: string;
    password: string;

    constructor(email: string, username: string, password: string, first_name: string, last_name: string) {
        this.first_name = first_name;
        this.last_name = last_name
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
