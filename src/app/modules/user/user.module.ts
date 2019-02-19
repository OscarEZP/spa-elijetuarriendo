import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user.router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [UserRoutingModule, FormsModule, CommonModule],
  declarations: [
    UserComponent,
    CreateComponent,
    ListComponent
  ],
  providers: [],
})
export class UserModule { }
