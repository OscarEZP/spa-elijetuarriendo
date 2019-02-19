import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ngForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForms();
  }

  buildForms() {
    this.ngForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(form: any) {
    return this.authService.login(form.username, form.password);
  }

}
