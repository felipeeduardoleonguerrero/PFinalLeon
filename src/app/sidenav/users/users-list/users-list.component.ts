import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { deleteUser, getDetailedUser } from '../../Store/Features/Users/users.actions';
import { selectUsersDetailedSuccess, selectUsersSuccess } from '../../Store/Features/Users/users.selectors';
import { Users } from '../users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild('detail') detail: TemplateRef<any>;

  users:Users[];

  subscriptions: Subscription;

  displayedColumns=['name', 'password', 'role', 'info', 'edit', 'delete'];

  userDetails:any;

  detailsData: MatTableDataSource<any>;

  constructor(private router:Router, public dialogDetails: MatDialog, private dialog: MatDialog, private usersService: UsersService, private store:Store<any>) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    //Arreglo de usuarios desde store

    this.subscriptions.add(
      this.store.select(selectUsersSuccess).subscribe(
        (val)=>{
          if (val.users.length>0){
            this.users=val.users;
          }
        }
      )
    )

    //Objeto de detalles de estudiante por medio de store 

    this.subscriptions.add(
      this.store.select(selectUsersDetailedSuccess).subscribe(
        (val)=>{
            this.userDetails=val;
        }
      )
    )

  }

  //Agregar usuario

  addUser(){
    this.router.navigate(["home/users/add-edit"]);
  }

  //Editar usuario

  editUser(el:any){
    this.usersService.userToEdit=el;
    this.router.navigate(["home/users/add-edit"]);
  }

  //Eliminar usuario

  deleteUser(el:any){
    this.store.dispatch(deleteUser({id:el.id}))
  }

  //Este método abre el modal de detalles (botón de información).

  openDialog(details:any){
    this.store.dispatch(getDetailedUser({id:details.id}));
    let dialogRef = this.dialog.open(this.detail, { disableClose: false });
    dialogRef.afterClosed().subscribe((result) => { });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
