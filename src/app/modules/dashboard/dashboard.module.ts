import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';

import { DashboardComponent, ModalContentComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { AlertModule } from 'ngx-bootstrap';
import { OwnerComponent } from './owner/owner.component';
import { LesseComponent } from './lesse/lesse.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ DashboardComponent,
    OwnerComponent,
    LesseComponent,
    ModalContentComponent,
  ],
  entryComponents: [ModalContentComponent]
})
export class DashboardModule { }
