import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  //MOCKAPI Estudiantes

  rootUrl="https://62b002803bbf46a3522a1694.mockapi.io/courses/";

  courseToEdit:any;

  constructor(private http: HttpClient) {}

  //Uso de Observable

  getCoursesList():Observable<Course[]> {

    return this.http.get<Course[]>(this.rootUrl);
    
  }

  getCourseToEdit():Observable<any> {
    return of(this.courseToEdit);
  }

  //Adición de estudiante: Uso de MOCKAPI

  postCourse(course:any):Observable<Course> {
    return this.http.post<Course>(this.rootUrl, course);
  }

  //Actualización de estudiante: Uso de MOCKAPI

  updateCourse(course:Course):Observable<Course>{
    return this.http.put<Course>(this.rootUrl + `/${course.id}`, course)
  }
  
  //Eliminación de estudiante: Uso de MOCKAPI

  removeCourse(id:string):Observable<Course> {
    return this.http.delete<Course>(this.rootUrl + `/${id}`);
  }

  getCourseDetails(id:string):Observable<Course> {
    return this.http.get<Course>(this.rootUrl+`/${id}`);
  }

}
