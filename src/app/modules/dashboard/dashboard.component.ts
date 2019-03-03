import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  userLogin: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getUserLogin();
  }

  getUserLogin() {
    this.userService.getUser(this.currentUser.key)
      .subscribe(res => {
        console.log(res, 'user');
        this.userLogin = res;
      }, error => {
        console.log(error);
      });
  }

}
