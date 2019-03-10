import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  bsModalRef: BsModalRef;
  currentUser: any;
  userLogin: any;

  constructor(private userService: UserService, private modalService: BsModalService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getUserLogin();
  }

  getUserLogin() {
    this.userService.getUsersByEmail(this.currentUser.user.email)
      .subscribe((res: any) => {
        this.userLogin = res.find(f => {
          if (f.data.email === this.currentUser.user.email) {
            return f;
          }
        });
        if (!this.userLogin.data.infoComplete) {
          this.openModalWithComponent();
        }
      }, error => {
        console.log(error);
      });
  }

  openModalWithComponent() {
    const initialState = {
      list: ['¿Desea completar el registro?'],
      title: 'Completar Registro'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.successBtnName = 'Aceptar';
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }


}

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <span *ngFor="let item of list">{{item}}</span>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default"
        routerLink="/users/complete-information"
        (click)="bsModalRef.hide()">{{successBtnName}}
      </button>
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }

}
