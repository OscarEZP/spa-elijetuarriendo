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
      type: [userInformation ? userInformation.type : null],
      infoComplete: [true]
    });
  }

  getUserInformation() {
    this.userService.getUsersByEmail(this.currentUser.user.email)
      .subscribe((res: any) => {
        this.user = res.find(f => {
          if (f.data.email === this.currentUser.user.email) {
            return f;
          }
        });
        this.buildForm(this.user.data);
      }, error => {
        console.log(error, 'error');
      });
  }

  getForm(form: any) {
    this.userService.updateUser(this.user.key, form);
    // this.ngForm.reset();
  }

}
