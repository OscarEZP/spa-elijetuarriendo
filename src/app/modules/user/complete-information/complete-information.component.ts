import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-complete-information',
  templateUrl: './complete-information.component.html',
  styleUrls: ['./complete-information.component.scss']
})
export class CompleteInformationComponent implements OnInit {
  ngForm: FormGroup;
  currentUser: any;
  user: any;
  list: AngularFireList<Observable<any>[]>;

  constructor(
    private fb: FormBuilder,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUsersList();
    this.buildForm();
    this.getUserInformation();
  }

  buildForm(userInformation?) {
    this.ngForm = this.fb.group({
      name: [userInformation ? userInformation.name : null, Validators.required],
      rut: [userInformation ? userInformation.rut : null, Validators.required],
      address: [userInformation ? userInformation.address : null, Validators.required],
      email: [userInformation ? userInformation.email : null, Validators.required],
      phone: [userInformation ? userInformation.phone : null, Validators.required],
      userType: [userInformation ? userInformation.type : null],
      infoComplete: [true]
    });
  }

  getUserInformation() {
    this.userService.getUser(this.currentUser.key)
      .subscribe(res => {
        this.buildForm(res);
      }, error => {
        console.log(error, 'error');
      });
  }

  getForm(form: any) {
    this.userService.updateUser(this.currentUser.key, form);
    // this.ngForm.reset();
  }

}
