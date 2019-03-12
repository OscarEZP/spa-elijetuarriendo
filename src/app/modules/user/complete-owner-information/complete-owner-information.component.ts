import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, from, combineLatest } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MessageService } from '../../../services/message.service';
import { UploadClass } from '../../upload-files/upload-class';
import { UploadService } from '../../../services/upload.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-complete-owner-information',
  templateUrl: './complete-owner-information.component.html',
  styleUrls: ['./complete-owner-information.component.scss'],
})
export class CompleteOwnerInformationComponent implements OnInit {
  ngForm: FormGroup;
  pastLeaseForm: FormGroup;
  bsModalRef: BsModalRef;
  pastLeaseList: any[] = [];
  arrayFiles: any[] = [];
  @Input() userData: any;
  uploadURL: any;
  downloadURLs: any = [];
  uploads: any[] = [];

  constructor(
    private fb: FormBuilder,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore,
    public uploadService: UploadService,
    public userService: UserService,
    public storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.buildForm();
    this.buildFormPastLease();
    console.log(this.userData, 'user data');
  }

  buildForm() {
    this.ngForm = this.fb.group({
      fileFrontRut: [null],
      fileBackRut: [null],
      fileDomainCertificate: [null],
      fileMortgageCertificate: [null],
      pastLeases: []
    });
  }

  buildFormPastLease() {
    this.pastLeaseForm = this.fb.group({
      commune: null,
      street: null,
      depto: null,
      name: null,
      phone: null,
      email: null
    });
  }

  getForm(form) {
    this.uploads = [];
    const pushStorage = {
      fileFrontRut: this.sendFile(this.arrayFiles.find(f => f.type === 'fileFrontRut')),
      fileBackRut: this.sendFile(this.arrayFiles.find(f => f.type === 'fileBackRut')),
      fileDomainCertificate: this.sendFile(this.arrayFiles.find(f => f.type === 'fileDomainCertificate')),
      fileMortgageCertificate: this.sendFile(this.arrayFiles.find(f => f.type === 'fileMortgageCertificate'))
    };

  }

  postPastLease() {
    this.pastLeaseList.push(this.pastLeaseForm.value);
    this.ngForm.controls.pastLeases.setValue(this.pastLeaseList);
    this.pastLeaseForm.reset();
  }

  sendFile(file) {
    if (file) {
      const filePath = `/documents/${file.file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file.file);
      let resFile = {};

      return task.snapshotChanges().pipe(
        // tslint:disable-next-line:no-shadowed-variable
        // switchMap(() => from(fileRef.getDownloadURL()))
        finalize(() => {
          this.uploadURL = fileRef.getDownloadURL();
          this.uploadURL.subscribe(url => {
            this.uploads = [];
            resFile = {
              url,
              file: file.file.name,
              type: file.type
            };
            this.userService.saveDocumentsUser(this.userData.key, resFile);
          });
        })
      ).subscribe(() => {});
    }
  }

  detectFiles($event, form) {
    const file = $event.target.files.item(0);
    const currentUpload = new UploadClass(file);
    this.arrayFiles.push( { file : currentUpload.file, type: form });
  }

}
