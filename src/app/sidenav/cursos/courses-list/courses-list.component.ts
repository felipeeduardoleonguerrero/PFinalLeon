import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/services/course';
import { RegistrationService } from 'src/app/services/registration.service';
import { Students } from 'src/app/services/students';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';
import { deleteCourse, getDetailedCourse } from '../../Store/Features/Courses/courses.actions';
import { selectCourseDetailedSuccess, selectCoursesSuccess } from '../../Store/Features/Courses/courses.selectors';
import { selectStudentsSuccess } from '../../Store/Features/Students/students.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  
  @ViewChild('detail') detail: TemplateRef<any>;

  students:Students[];

  courses:Course[];

  registration:any;

  registrations:any;

  allRegistrations:any;

  registrationToEdit:any;

  registrationList:any;

  subscriptions: Subscription;

  displayedColumns:any;

  displayedColumnsTwo:any;

  public courseDetails:any;

  // public detailsData: MatTableDataSource<any>;

  @ViewChild('table') table: MatTable<any>;

  @ViewChild('detailTable') detailTable: MatTable<any>;

  adminStatus:boolean;

  constructor(private router:Router, private studentsService:StudentsService, public dialogDetails: MatDialog, private dialog: MatDialog, private registrationService:RegistrationService, private usersService:UsersService, private store: Store<any>) { }

  ngOnInit(): void {
    
    this.subscriptions=new Subscription();

    //Suscripción a un servicio con observable: inscripciones

    this.subscriptions.add(
      this.registrationService.getRegistrationList().subscribe(

        (val)=>this.registration=val

      )
    )

    //Arreglo de cursos desde store

    this.subscriptions.add(
      this.store.select(selectCoursesSuccess).subscribe(
        (val)=>{
          if (val.courses.length>0){
            this.courses=val.courses;
          }
        }
      )
    )

    //Arreglo de estudiantes desde store

    this.subscriptions.add(
      this.store.select(selectStudentsSuccess).subscribe(
        (val)=>{
          if (val.students.length>0){
            this.students=val.students;
          }
        }
      )
    )

    //Arreglo de detalles del curso por medio de store 

    this.subscriptions.add(
      this.store.select(selectCourseDetailedSuccess).subscribe(
        (val)=>{
            this.courseDetails=val;
        }
      )
    )

    this.getRegistration();

    this.subscriptions.add(
      this.usersService.adminStatus().subscribe(
        (data)=>{
          this.adminStatus=data;
        }
      )
    )
    

    if (this.adminStatus) {
      this.displayedColumns = ['course', 'info', 'edit', 'delete'];
      this.displayedColumnsTwo = ['student', 'course', 'delete'];
      
    } else {  
      this.displayedColumns =['course', 'info'];
      this.displayedColumnsTwo = ['student', 'course'];
    }

  }

  getRegistration(){
    this.subscriptions.add(
      this.registrationService.getRegistrationList().subscribe(
        (data)=>{
          this.registrationList=data;
        }
      )
    )
  }
  
  addCourse() {
    this.router.navigate(["home/courses/add-edit"]);
  }

  editCourse(el:any) {

    //Edición de curso

    this.studentsService.courseToEdit=el;
    this.router.navigate(["home/courses/add-edit"]);

  }

  deleteCourse(el:any) {
    this.store.dispatch(deleteCourse({id:el.id}))
  }

  //Este método abre el modal de detalles (botón de información).

  openDialog(details:any){

    //Trae el objeto/fila del curso desde la tabla de detalles.

    this.courseDetails = details;

    // this.store.dispatch(getDetailedCourse({id:details.id}));

    // Vacía el arreglo de inscripciones al mismo curso (inicializar detalles).

    this.registrations=[];

    this.registration.map((singleRegistration: any) => {

      if (singleRegistration.course === this.courseDetails.name) {

        this.registrations.push(singleRegistration);
        
      }
    })

    let dialogRef = this.dialog.open(this.detail, { disableClose: false });
    dialogRef.afterClosed().subscribe((result) => { });

  }

//Eliminación de inscripción

  deleteRegistration(id:string){
    this.registrationService.removeRegistration(id).subscribe(
      (data)=>{
        this.getRegistration();
      }
    );
    // this.detailTable.renderRows();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
