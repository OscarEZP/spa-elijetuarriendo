import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
        data: { title: 'Crear usuarios' }
      },
      {
        path: 'list/leess',
        component: ListComponent,
        data: { title: 'Lista de arrendatarios', slug: 'LESSEE' }
      },
      {
        path: 'list/owners',
        component: ListComponent,
        data: { title: 'Lista de propietarios', slug: 'OWNER' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
