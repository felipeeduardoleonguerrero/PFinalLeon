import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { StudentsService } from 'src/app/services/students.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @ViewChild('detail') detail: TemplateRef<any>;

  students:any;

  courses:any;

  registration:any;

  registrations:any;

  allRegistrations:any;

  registrationToEdit:any;

  registrationList:any;

  subscriptions: Subscription;

  displayedColumns:any;

  displayedColumnsTwo:any;

  public courseDetails:any;

  public detailsData: MatTableDataSource<any>;

  @ViewChild('table') table: MatTable<any>;

  adminStatus:boolean;

  constructor(private router:Router, private studentsService:StudentsService, public dialogDetails: MatDialog, private dialog: MatDialog, private registrationService:RegistrationService, private usersService:UsersService) { }

  ngOnInit(): void {
    
    this.subscriptions=new Subscription();
    
    //Suscripción a un servicio con observable
    this.subscriptions.add(
      this.studentsService.getCoursesList().subscribe(

        (val)=>this.courses=val

      )
    )
    
    //Suscripción a un servicio con observable: estudiantes
    this.subscriptions.add(
      this.studentsService.getStudentsList().subscribe(

        (val)=>this.students=val

      )
    )

    //Suscripción a un servicio con observable: inscripciones
    this.subscriptions.add(
      this.registrationService.getRegistrationList().subscribe(

        (val)=>this.registration=val

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
        
    //Eliminación de curso

    let index = this.courses.findIndex((course: { id: any; })=> course.id===el.id);
    this.courses.splice(index,1);
    this.table.renderRows();
    this.studentsService.coursesList=this.courses!;

  }

  //Este método abre el modal de detalles (botón de información).

  openDialog(details:any){

    //Trae el objeto/fila del curso desde la tabla de detalles.
    this.courseDetails = details;

    //Vacía el arreglo de inscripciones al mismo curso (inicializar detalles).
    this.registrations=[];

    //console.log(this.registration);
    //console.log(this.courseDetails);

    this.registration.map((singleRegistration: any) => {

      if (singleRegistration.course === this.courseDetails.name) {

        this.registrations.push(singleRegistration);
        
      }
    })

    let dialogRef = this.dialog.open(this.detail, { disableClose: false });
    dialogRef.afterClosed().subscribe((result) => { });

  }

  // openDialog(details:any){
  //   this.courseRegistration = details;
  //   let dialogRef = this.dialog.open(this.detail, { disableClose: false });
  //   dialogRef.afterClosed().subscribe((result) => { });

  // }

//Eliminación de inscripción

  deleteRegistration(id:number){
    this.registrationService.removeRegistration(id).subscribe(
      (data)=>{
        this.getRegistration();
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
