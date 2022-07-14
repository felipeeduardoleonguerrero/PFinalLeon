import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions:Subscription;

  loginForm:FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private usersService:UsersService) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.loginForm=this.fb.group({

      user:['', Validators .required],
      password:['', Validators .required]

    })
  }

  //Autenticación del usuario. En caso contrario los Guards bloquearan el acceso al resto del sitio.

  onSubmit(){
    
    if(this.loginForm.value.user==='admin' && this.loginForm.value.password==='password'){
      this.usersService.adminsLogIn();
      this.router.navigate(["home/welcome"]);
    } else if (this.loginForm.value.user==='user' && this.loginForm.value.password==='password') {
      this.usersService.usersLogIn();
      this.router.navigate(["home/welcome"]);
    } else {
      window.alert('Usuario erróneo.')
    }
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
