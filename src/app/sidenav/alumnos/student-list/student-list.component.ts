import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Students } from 'src/app/services/students';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';
import { deleteStudents, getDetailedStudents, postStudents } from '../../Store/Features/Students/students.actions';
import { selectStudentsDetailedSuccess, selectStudentsSuccess } from '../../Store/Features/Students/students.selectors';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {

  @ViewChild('detail') detail: TemplateRef<any>;

  students:Students[];

  subscriptions: Subscription;

  displayedColumns:any;

  displayedColumns2=['name', 'email'];

  public studentDetails:any;

  public detailsData: MatTableDataSource<any>;

  adminStatus:boolean;

  @ViewChild('table') table: MatTable<any>;

  constructor(private router:Router, private studentsService:StudentsService, public dialogDetails: MatDialog, private dialog: MatDialog, private usersService:UsersService, private store: Store<any>) {
    this.detailsData = new MatTableDataSource();
   }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    //this.getStudents();

    this.subscriptions.add(
      this.usersService.adminStatus().subscribe(
        (data)=>{
          this.adminStatus=data;
        }
      )
    )

    if (this.adminStatus) {
      this.displayedColumns = ['student', 'email', 'country', 'info', 'edit', 'delete'];
      
    } else {  
      this.displayedColumns = ['student', 'email', 'country'];
    }

    //Arreglo de estudiantes de Ngrx effects
    
    // this.store.select(selectStudentsSuccess).subscribe(
    //   (val)=>{
    //    if (val.students.length>0) {
    //     this.students=val.students
    //    }
    //   }
    // )

    // this.store.select(selectStudentsSuccess).subscribe(
    //   (val)=>{
    //     console.log(val)
    //   }
    // )

    this.store.select(selectStudentsSuccess).subscribe(
      (val)=>{
        if (val.students.length>0){
          this.students=val.students;
        }
      }
    )
    this.store.select(selectStudentsDetailedSuccess).subscribe(
      (val)=>{
        console.log(val);
      }
    )
    
  }


  // getStudents(){
  //   this.subscriptions.add(
  //     this.studentsService.getStudentsList().subscribe(
  //       (data)=>{
  //         this.students=data;
  //       }
  //     )
  //   )
  // }

  addStudent(){
    let student = {
      id: 100,
      studentName:"Felipe",
      studentSurname: "León",
      course: "Angular",
      class: "",
      period: "",
      email: "felipe@mail.com",
      country: "México"
    }
    this.store.dispatch(postStudents({student:student}))
  }

  editStudent(el:any){
    
    //Edición de estudiante
    this.studentsService.studentToEdit=el;
    this.router.navigate(["home/students/add-edit"]);

  }

//Eliminación de estudiante

  deleteStudent(el:any){
    this.store.dispatch(deleteStudents({id:el.id}))
  }

  //Este método abre el modal de detalles (botón de información).

  openDialog(details:any){
    this.studentDetails = details;
    let dialogRef = this.dialog.open(this.detail, { disableClose: false });
    dialogRef.afterClosed().subscribe((result) => { });

  }

  getStudentDetails(el:any){
    this.store.dispatch(getDetailedStudents({id:el.id}))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog-elements.html',
})

export class DialogElements {}