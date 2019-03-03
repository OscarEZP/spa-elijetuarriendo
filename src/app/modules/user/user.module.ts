import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompleteInformationComponent } from './complete-information/complete-information.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserService } from '../../services/user.service';

@NgModule({
  imports: [UserRoutingModule, AngularFireDatabaseModule, FormsModule, CommonModule, ReactiveFormsModule],
  declarations: [
    UserComponent,
    CreateComponent,
    ListComponent,
    CompleteInformationComponent,
  ],
  providers: [UserService],
})
export class UserModule { }
