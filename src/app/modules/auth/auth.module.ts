import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2Rut } from 'ng2-rut';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    Ng2Rut
  ],
  declarations: [
  AuthComponent,
],
  providers: [],
})
export class AuthModule { }
