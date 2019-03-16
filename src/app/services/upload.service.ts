import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { UploadClass } from '../models/upload.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  private basePath = '/uploads';
  uploads: AngularFireList<UploadClass[]>;

  pushUpload(upload: UploadClass) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.name}`).put(upload);

    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   (snapshot: any) =>  {
    //     // upload in progress
    //     upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log(snapshot, 'snap');
    //   },
    //   (error) => {
    //     // upload failed
    //     console.log(error);
    //   },
    //   () => {
    //     console.log('unsubscribe');
    //     // upload success
    //     upload.url = uploadTask.snapshot.downloadURL;
    //     upload.name = upload.name;
    //     // this.saveFileData(upload);
    //   }
    // );
    console.log(uploadTask.snapshot.downloadURL, 'descarga');
    return uploadTask;
  }

  uploadFile(filePath, file) {
    const task = this.storage.upload(filePath, file);
    return task;
  }

  saveDocumentsUser(form: any) {
    const storageRef = firebase.storage().ref();
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: UploadClass) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
}
