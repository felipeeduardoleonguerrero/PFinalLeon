import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

interface Role {
  name: string;
  displayName: string;
}

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  roles: Role[] = [
    {name: 'Administrador', displayName: 'Administrador'},
    {name: 'Usuario', displayName: 'Usuario'}
  ];

  usersForm:FormGroup;

  userToEdit:any;

  subscriptions:Subscription;

  constructor(private fb:FormBuilder, private usersService:UsersService, private router:Router) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.usersForm=this.fb.group({

      name:['', Validators .required],
      password:['', Validators .required],
      role:['', Validators.required]

    })

    this.subscriptions.add(
      this.usersService.getUserToEdit().subscribe(
        val=>this.userToEdit=val
      )
    )

    if(this.userToEdit){

      this.usersForm.get('name')?.patchValue(this.userToEdit.name);
      this.usersForm.get('password')?.patchValue(this.userToEdit.password);
      this.usersForm.get('role')?.patchValue(this.userToEdit.role);
      
    }

  }

  onSubmit() {

    const user = this.usersForm.value;
    
    //Actualizar o actualizar al usuario a la MOCKAPI
    
    if(!this.userToEdit){
      this.usersService.postUser(user).subscribe(
      (val)=>{
          this.router.navigate(['/home/users/list'])
        }
      )
    } else {
      user['id']=this.userToEdit.id;
      this.usersService.updateUser(user).subscribe(
        (val)=>{
          this.usersService.userToEdit=null;
          this.router.navigate(['/home/users/list'])
        }
      )
    }
  }

  goBack () {
    this.usersService.userToEdit=null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
