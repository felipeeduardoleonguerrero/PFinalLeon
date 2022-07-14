import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Observable, of, Subscription } from 'rxjs';
import { ToolbarButtonsService } from '../services/toolbar-buttons.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit, OnDestroy {

  subscriptions:Subscription;

  //Promise

  asyncHeart:Promise<string>;

  //Observable

  asyncShare:Observable<any>;

  shareButton:any;

  constructor(private toolbarButtonsService:ToolbarButtonsService, private usersService: UsersService, private router:Router) {}

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.asyncHeart = this.heartPromise('favorite');

    //Suscripción al servicio observable

    this.subscriptions.add(
      this.toolbarButtonsService.getAsyncShare().subscribe(

        (val)=>this.shareButton=val

      )
    )

    this.asyncShare = this.shareObservable(this.shareButton);
  }

  //Promesa con Pipe Async

  heartPromise(value:string): Promise<string> {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>resolve(value),2000)
    })
  }

  //Observable con operador RxJS delay

  shareObservable(val:string) {
    return of (val).pipe(delay(4000))
  }

  logOut(){
    this.usersService.signOut();
    this.router.navigate(["home/login"]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
