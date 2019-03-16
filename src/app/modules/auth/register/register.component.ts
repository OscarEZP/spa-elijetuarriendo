import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { USER } from '../../../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  ngForm: FormGroup;
  user: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user = this.afAuth.authState
      .subscribe(user => {
        if (user) {
          // logged in, get custom user from Firestore
          return this.afs.doc<USER>(`users/${user.uid}`).valueChanges();
        } else {
          // logged out, null
          return null;
        }
      });
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.ngForm = this.fb.group({
      rut: [null, Validators.required ],
      userType: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  getForm(form: any) {
    this.authService.emailSignUp(form);
  }

}
