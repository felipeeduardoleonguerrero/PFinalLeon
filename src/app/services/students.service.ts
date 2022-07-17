import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Students } from './students';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  //MOCKAPI Estudiantes

  rootUrl="https://62a7cf5197b6156bff933692.mockapi.io/api/v1/students/";
  
  //Arreglo con todos los estudiantes
  studentsList:any=[
    {
      id: 1,
      studentName:"Felipe",
      studentSurname: "León",
      course: ['Angular', 'Javascript', 'PHP'],
      class: "Primera",
      period: "Primero",
      email: "felipe@mail.com",
      country: "México"
    },
    {
      id: 2,
      studentName:"Michelle",
      studentSurname: "Deschamps",
      course: ['Angular', 'Javascript', 'PHP'],
      class: "Primera",
      period: "Segundo",
      email: "michelle@mail.com",
      country: "Haití"
    },
    {
      id: 3,
      studentName:"Lorelei",
      studentSurname: "Blaustein",
      course: ['Angular', 'Javascript'],
      class: "Primera",
      period: "Primero",
      email: "lorelei@mail.com",
      country: "Liechtenstein"
    },
    {
      id: 4,
      studentName:"Sergei",
      studentSurname: "Romanov",
      course: ['Javascript', 'PHP'],
      class: "Introducción",
      period: "Tercero",
      email: "sergei@mail.com",
      country: "Rusia"
    }
  ];
  
  //Recibe un objeto sin arreglo
  studentToEdit:any;


  //Arreglo con cursos
  coursesList:any=[
    {
      id: 1,
      name: "Angular",
      cost: '1000'
    },
    {
      id: 2,
      name: "Javascript",
      cost: '2000'
    },
    {
      id: 3,
      name: "PHP",
      cost: '3000'
    }
  ];

  courseToEdit:any;

  constructor(private http: HttpClient) {}

  //Lista de estudiantes desde la MOCKAPI

  getStudentsList():Observable<any> {
    return this.http.get<Students[]>(this.rootUrl);

    //return of(this.studentsList);

  }

  //Uso de Observable

  getStudentToEdit():Observable<any> {

    return of(this.studentToEdit);

  }

  //Uso de Observable

  getCoursesList():Observable<any> {

    return of(this.coursesList);
    
  }

  getCourseToEdit():Observable<any> {
    return of(this.courseToEdit);
  }

  //Adición de estudiante: Uso de MOCKAPI

  postStudent(student:any):Observable<Students> {
    return this.http.post<Students>(this.rootUrl, student);
  }

  //Actualización de estudiante: Uso de MOCKAPI

  updateStudent(student:Students):Observable<Students>{
    return this.http.put<Students>(this.rootUrl + `/${student.id}`, student)
  }
  
  //Eliminación de estudiante: Uso de MOCKAPI

  removeStudent(id:string):Observable<Students> {
    return this.http.delete<Students>(this.rootUrl + `/${id}`);
  }

  getStudentDetails(id:string):Observable<Students> {
    return this.http.get<Students>(this.rootUrl+`${id}`);
  }

}
