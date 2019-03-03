import { ROLES } from './roles.model';

export class USER {
    uid: string;
    email: string;
    rut: string;
    type: string;
    role: ROLES;

    constructor(user: USER) {
        this.email = user.email;
        this.rut = user.rut;
        this.type = user.type;
        this.role = user.role;
        this.uid = user.uid;
    }
}
