import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.scss']
})
export class AddRegistrationComponent implements OnInit, OnDestroy {

  registrationForm:FormGroup;
  
  subscriptions: Subscription;

  studentToEdit: any;

  constructor(private fb:FormBuilder, private studentsService:StudentsService, private router:Router) { }

  ngOnInit(): void {

    this.subscriptions=new Subscription();

    this.registrationForm=this.fb.group({

      studentName:['', Validators .required],
      studentSurname:['', Validators .required],
      course:['', Validators .required],
      period:['', Validators .required]

    })

      //Suscripción a los cursos a editar

      this.subscriptions.add(
        this.studentsService.getStudentToEdit().subscribe(
  
          val=>this.studentToEdit=val
  
        )
      )

    //Al editar al curso se llenan los valores del formulario con patchValue

    if(this.studentToEdit){

      this.registrationForm.get('studentName')?.patchValue(this.studentToEdit.studentName);
      this.registrationForm.get('studentSurname')?.patchValue(this.studentToEdit.studentSurname);
      this.registrationForm.get('course')?.patchValue(this.studentToEdit.course);
      this.registrationForm.get('period')?.patchValue(this.studentToEdit.period);
      
    }

  }

  onSubmit(){

    //Suscripción a los cursos

    let students=[];

    this.subscriptions.add(
      this.studentsService.getStudentsList().subscribe(

        val=>students=val

      )
    )

    //Generamos un id para el nuevo curso. Si no hay cursos, el índice del nuevo curso será igual a index (1).
    
    let index=1;

    if (students.length>0 && !this.studentToEdit) {

      index=students.length+1;
      this.registrationForm.value['id']=index;
      students.push(this.registrationForm.value);

    } else if (students.length===0 && !this.studentToEdit){

      this.registrationForm.value['id']=index;
      students.push(this.registrationForm.value)

    }

    //Actualizamos al curso encontrando su id.

    if (this.studentToEdit) {
        let indexOfStudent = students.findIndex((student)=>student.id===this.studentToEdit.id);
       students[indexOfStudent]=this.registrationForm.value;
       this.studentsService.studentToEdit=null;
    }

    //Igualamos students con studentsList (students.servivce). ! (null assertion value) avisa a Angular que el valor no será igual a null.

    this.studentsService.studentsList=students!;
    this.router.navigate(["home/registration/list"]);
  }

  /*cancelRegistration() {
    this.router.navigate(["home/registration/list"]);
  }*/

  goBack () {
    this.studentsService.studentToEdit=null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
