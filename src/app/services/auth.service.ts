import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USER } from '../models/user.model';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
 })
export class AuthService {
  user: any;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private router: Router) { }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      });
    });
  }

  async login(email:  string, password:  string) {

    try {
      await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          this.userLogin(res.user.uid);
          this.router.navigate(['dashboard']);
        }, error => {
          console.log('error');
        });

    } catch (e) {
      alert('Error!'  +  e.message);
    }
  }

  userLogin(key) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('currentUser', JSON.stringify( { user: this.user, key }));
        this.router.navigateByUrl('/dashboard');
      } else {
        localStorage.setItem('currentUser', null);
        this.router.navigate(['login']);
      }
    });
  }


  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('currentUser');
    this.router.navigate(['dashboard']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  emailSignUp(form) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(form.email, form.password)
      .then(user => {
        this.login(form.email, form.password);
        return this.setUserDoc(user.user, form).then(res => {
          this.userLogin(res.key);
        });
      })
      .catch(error => this.handleError(error) );
  }

  private handleError(error) {
    // console.error(error);
    // this.user.update(error.message, 'error');
    console.log(error, 'error');
  }

  private setUserDoc(user, form) {
    const userRef = this.afd.list(`/users`);
    const data = {
      uid: user.uid,
      email: user.email || null,
      type: form.userType,
      rut: form.rut,
      infoComplete: false
    };

    return userRef.push(data);

  }
}
