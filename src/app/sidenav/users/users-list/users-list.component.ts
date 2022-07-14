import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
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

  constructor(private router:Router, public dialogDetails: MatDialog, private dialog: MatDialog, private usersService: UsersService) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    //Ejecución para obtener usuarios
    
    this.getUsers();
  }

//Obtener usuarios

  getUsers(){
    this.subscriptions.add(
      this.usersService.getUsersList().subscribe(
        (data)=>{
          this.users=data;
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

  deleteUser(id:number){
    this.usersService.removeUser(id).subscribe(
      (data)=>{
        this.getUsers();
      }
    )
  }

  //Este método abre el modal de detalles (botón de información).

  openDialog(details:any){
    this.userDetails = details;
    let dialogRef = this.dialog.open(this.detail, { disableClose: false });
    dialogRef.afterClosed().subscribe((result) => { });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
