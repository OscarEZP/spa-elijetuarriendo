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
    this.userService.getUsersByEmail(this.currentUser.user.email)
      .subscribe((res: any) => {
        this.userLogin = res.find(f => {
          if (f.data.email === this.currentUser.user.email) {
            return f;
          }
        });
        console.log(this.userLogin, 'login');
      }, error => {
        console.log(error);
      });
  }

}
