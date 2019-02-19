import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { USERS } from '../../../mocks/users.mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public title: any;
  public users = USERS;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        console.log(data, 'data de la ruta');
        this.title = data;
      }, error => {
        console.log(error, 'error');
      });

    this.getDataUsers();
  }

  getDataUsers() {
    this.users = this.users.filter(f => f.type === this.title.slug.toUpperCase());
    console.log(this.users);
  }

}
