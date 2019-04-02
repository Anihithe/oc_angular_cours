import { UserModel } from '../models/user.model';
import { Subject } from 'rxjs';

export class UserService {
    private users: UserModel[] = [new UserModel('Valenin', 'Joly', 'vj@vj.com', 'jus de pomme', ['faire du vélo', 'jouer'])];
    userSubject = new Subject<UserModel[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: UserModel) {
        this.users.push(user);
        this.emitUsers();
    }
}
