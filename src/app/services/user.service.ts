import { Injectable } from '@angular/core';
import { USER } from '../models/user.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  postUser(user: USER) {
    this.usersRef.push({
      email: user.email,
      rut: user.rut,
      type: user.type
    });
  }

  getUser(id: string) {
    this.userRef = this.db.object('/users/' + id);
    return this.userRef.valueChanges();
  }

  getUsersList() {
    this.usersRef = this.db.list('/users');
    return this.usersRef;
  }

  getUsersByEmail(email: string) {
    return this.db.list('/users', ref =>
      ref.orderByChild('email').equalTo(email))
      .snapshotChanges()
      .pipe(map(item => {
        return item.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, data};           // or {key, ...data} in case data is Obj
        });
      }));
  }

  updateUser(uid: string, data: any) {
    return this.db.object(`users/${uid}`).update(data);
  }

  deleteUser(id: string) {
    this.userRef = this.db.object('/users/' + id);
    this.userRef.remove();
  }

}
