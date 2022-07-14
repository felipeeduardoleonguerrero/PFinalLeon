import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  // subscriptions:Subscription;

  adminStatus:boolean = this.usersService.adminLoggedIn;

  constructor(public usersService:UsersService){}

  ngOnInit(): void {

    // this.subscriptions=new Subscription();
    
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }

}
