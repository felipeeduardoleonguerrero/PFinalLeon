import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/services/students.service';
import { postRegistration } from '../../Store/Features/Registration/registration.actions';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.scss']
})
export class AddRegistrationComponent implements OnInit, OnDestroy {

  registrationForm:FormGroup;
  
  subscriptions: Subscription;

  registrationToEdit: any;

  constructor(private fb:FormBuilder, private studentsService:StudentsService, private router:Router, private store:Store<any>) { }

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
  
          val=>this.registrationToEdit=val
  
        )
      )

    //Al editar al curso se llenan los valores del formulario con patchValue

    if(this.registrationToEdit){

      this.registrationForm.get('studentName')?.patchValue(this.registrationToEdit.studentName);
      this.registrationForm.get('studentSurname')?.patchValue(this.registrationToEdit.studentSurname);
      this.registrationForm.get('course')?.patchValue(this.registrationToEdit.course);
      this.registrationForm.get('period')?.patchValue(this.registrationToEdit.period);
      
    }

  }

  onSubmit(){

    const registration = this.registrationForm.value;
    
    //Actualizar o actualizar el registro a la MOCKAPI
    
    if(!this.registrationToEdit){
      this.store.dispatch(postRegistration({registration:registration}));
      this.router.navigate(['/home/registration/list']);
    } else {
      registration['id']=this.registrationToEdit.id;
      this.studentsService.updateStudent(registration).subscribe(
        (val)=>{
          this.studentsService.studentToEdit=null;
          this.router.navigate(['/home/registration/list'])
        }
      )
    }

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
