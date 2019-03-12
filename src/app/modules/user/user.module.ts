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
import { Ng2Rut } from 'ng2-rut';
import { CompleteOwnerInformationComponent } from './complete-owner-information/complete-owner-information.component';
import { ModalModule } from 'ngx-bootstrap';
import { MessageService } from '../../services/message.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularFireDatabaseModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    Ng2Rut,
    ModalModule.forRoot(),
    ComponentsModule,
  ],
  declarations: [
    UserComponent,
    CreateComponent,
    ListComponent,
    CompleteInformationComponent,
    CompleteOwnerInformationComponent,
  ],
  providers: [UserService, MessageService],
})
export class UserModule { }
