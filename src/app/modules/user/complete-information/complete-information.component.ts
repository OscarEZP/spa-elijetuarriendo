import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { RutValidator } from 'ng2-rut';

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
  firstData: Boolean = true;
  secondData: Boolean = false;
  ngFormUploads: FormGroup;
  settingsFormUpload = {};
  constructor(
    private fb: FormBuilder,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore,
    private userService: UserService,
    private rutValidator: RutValidator
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUsersList();
    this.buildForm();
    this.getUserInformation();
    this.buildFormUploads();
  }

  buildForm(userInformation?) {
    this.ngForm = this.fb.group({
      name: [userInformation ? userInformation.name : null, Validators.required],
      rut: [userInformation ? userInformation.rut : null, [Validators.required, this.rutValidator]],
      address: [userInformation ? userInformation.address : null, Validators.required],
      email: [userInformation ? userInformation.email : null, Validators.required],
      phone: [userInformation ? userInformation.phone : null, Validators.required],
      type: [userInformation ? userInformation.type : null],
      infoComplete: [true]
    });
  }

  buildFormUploads(userInformation?) {
    this.ngFormUploads = this.fb.group({
      fileFrontRut: [null],
      fileBackRut: [null],
      fileDomainCertificate: [null],
      fileMortgageCertificate: [null],
      fileRecords: [null],
      fileEquifax: [null],
      fileEviction: [null],
      pastLeases: [userInformation && userInformation.pastLeases.length > 0 ? userInformation.pastLeases : []]
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
        this.buildFormUploads(this.user.data);
      }, error => {
        console.log(error, 'error');
      });
  }

  getForm(form: any) {
    this.userService.updateUser(this.user.key, form);
    if (form.type === 'OWNER') {
      this.settingsFormUpload = {
        fileFrontRut: true,
        fileBackRut: true,
        fileDomainCertificate: true,
        fileMortgageCertificate: true,
        fileRecords: false,
        fileEquifax: false,
        fileEviction: false,
      };
    } else if (form.type === 'LESSEE') {
      this.settingsFormUpload = {
        fileFrontRut: true,
        fileBackRut: true,
        fileDomainCertificate: false,
        fileMortgageCertificate: false,
        fileRecords: true,
        fileEquifax: true,
        fileEviction: true,
      };
    } else {
      this.settingsFormUpload = {
        fileFrontRut: true,
        fileBackRut: true,
        fileDomainCertificate: true,
        fileMortgageCertificate: true,
        fileRecords: true,
        fileEquifax: true,
        fileEviction: true,
      };
    }
    this.firstData = false;
    this.secondData = true;
  }

}
