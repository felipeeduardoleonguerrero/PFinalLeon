import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import { postCourse } from '../../Store/Features/Courses/courses.actions';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  coursesForm:FormGroup;
  
  subscriptions: Subscription;

  courseToEdit: any;

  constructor(private fb:FormBuilder, private studentsService:StudentsService, private router:Router, private store:Store<any>, private coursesService:CoursesService) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.coursesForm=this.fb.group({

      name:['', Validators .required],
      cost:['', Validators .required]

    })

      //Suscripción a los cursos a editar

      this.subscriptions.add(
        this.studentsService.getCourseToEdit().subscribe(
  
          val=>this.courseToEdit=val
  
        )
      )

    //Al editar al curso se llenan los valores del formulario con patchValue

    if(this.courseToEdit){

      this.coursesForm.get('name')?.patchValue(this.courseToEdit.name);
      this.coursesForm.get('cost')?.patchValue(this.courseToEdit.cost);
      
    }

  }

  onSubmit(){

    // //Suscripción a los cursos

    // let courses=[];

    // this.subscriptions.add(
    //   this.studentsService.getCoursesList().subscribe(

    //     val=>courses=val

    //   )
    // )

    // //Generamos un id para el nuevo curso. Si no hay cursos, el índice del nuevo curso será igual a index (1).
    
    // let index=1;

    // if (courses.length>0 && !this.courseToEdit) {

    //   index=courses.length+1;
    //   this.coursesForm.value['id']=index;
    //   courses.push(this.coursesForm.value);

    // } else if (courses.length===0 && !this.courseToEdit){

    //   this.coursesForm.value['id']=index;
    //   courses.push(this.coursesForm.value)

    // }

    // //Actualizamos al curso encontrando su id.

    // if (this.courseToEdit) {
    //     let indexOfCourse = courses.findIndex((course)=>course.id===this.courseToEdit.id);
    //    courses[indexOfCourse]=this.coursesForm.value;
    //    this.studentsService.courseToEdit=null;
    // }

    // //Igualamos courses con coursesList (students.servivce). ! (null assertion value) avisa a Angular que el valor no será igual a null.

    // this.studentsService.coursesList=courses!;
    // this.router.navigate(["home/courses/list"]);

    const course = this.coursesForm.value;
    
    //Actualizar o actualizar al estudiante a la MOCKAPI
    
    if(!this.courseToEdit){
      this.store.dispatch(postCourse({course:course}));
      this.router.navigate(['/home/courses/list']);
    } else {
      course['id']=this.courseToEdit.id;
      this.coursesService.updateCourse(course).subscribe(
        (val)=>{
          this.coursesService.courseToEdit=null;
          this.router.navigate(['/home/courses/list'])
        }
      )
    }

  }

  goBack () {
    this.studentsService.courseToEdit=null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
