import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Students } from 'src/app/services/students';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';
import { selectRegistrationSuccess } from '../../Store/Features/Registration/registration.selectors';
import { selectStudentsSuccess } from '../../Store/Features/Students/students.selectors';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit, OnDestroy {

  @ViewChild('detail') detail: TemplateRef<any>;

  students:Students[];

  subscriptions: Subscription;

  displayedColumns:any;

  public studentDetails:any;

  public detailsData: MatTableDataSource<any>;

  @ViewChild('table') table: MatTable<any>;

  adminStatus:boolean;

  constructor(private router:Router, private studentsService:StudentsService, public dialogDetails: MatDialog, private dialog: MatDialog, private usersService:UsersService, private store: Store<any>) {}

  ngOnInit(): void {

    this.subscriptions=new Subscription();
    
    //Suscripción a un servicio con observable
    // this.subscriptions.add(
    //   this.studentsService.getStudentsList().subscribe(

    //     (val)=>this.students=val

    //   )
    // )

    //Arreglo de estudiantes desde store

    this.store.select(selectRegistrationSuccess).subscribe(
      (val)=>{
        if (val.registration.length>0){
          this.students=val.registration;
        }
      }
    )

    this.subscriptions.add(
      this.usersService.adminStatus().subscribe(
        (data)=>{
          this.adminStatus=data;
        }
      )
    )

    

  if (this.adminStatus) {
    this.displayedColumns=['student', 'course', 'period', 'info', 'edit'];
    
  } else {  
    this.displayedColumns=['student', 'course', 'period', 'info'];
  }
  }

  addRegistration(){
    this.router.navigate(["home/registration/add-edit"]);
  }

  editRegistration(el:any){
    
    //Edición de la suscripción
    this.studentsService.studentToEdit=el;
    this.router.navigate(["home/registration/add-edit"]);

  }

  //Este método abre el modal de detalles (botón de información).

  openDialog(details:any){
    this.studentDetails = details;
    let dialogRef = this.dialog.open(this.detail, { disableClose: false });
    dialogRef.afterClosed().subscribe((result) => { });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
