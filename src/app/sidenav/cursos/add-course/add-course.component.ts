import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  coursesForm:FormGroup;
  
  subscriptions: Subscription;

  courseToEdit: any;

  constructor(private fb:FormBuilder, private studentsService:StudentsService, private router:Router) { }

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

    //Suscripción a los cursos

    let courses=[];

    this.subscriptions.add(
      this.studentsService.getCoursesList().subscribe(

        val=>courses=val

      )
    )

    //Generamos un id para el nuevo curso. Si no hay cursos, el índice del nuevo curso será igual a index (1).
    
    let index=1;

    if (courses.length>0 && !this.courseToEdit) {

      index=courses.length+1;
      this.coursesForm.value['id']=index;
      courses.push(this.coursesForm.value);

    } else if (courses.length===0 && !this.courseToEdit){

      this.coursesForm.value['id']=index;
      courses.push(this.coursesForm.value)

    }

    //Actualizamos al curso encontrando su id.

    if (this.courseToEdit) {
        let indexOfCourse = courses.findIndex((course)=>course.id===this.courseToEdit.id);
       courses[indexOfCourse]=this.coursesForm.value;
       this.studentsService.courseToEdit=null;
    }

    //Igualamos courses con coursesList (students.servivce). ! (null assertion value) avisa a Angular que el valor no será igual a null.

    this.studentsService.coursesList=courses!;
    this.router.navigate(["home/courses/list"]);
  }

  goBack () {
    this.studentsService.courseToEdit=null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
