import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUserss } from '../Store/Features/Users/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private store:Store<any>) { }

  ngOnInit() {
    this.store.dispatch(loadUserss());
  }

}
