import { Component, OnInit } from '@angular/core';
import { UploadClass } from './upload-class';
import { UploadService } from '../../services/upload.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: UploadClass;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {}

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new UploadClass(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new UploadClass(files[idx]);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }
}
