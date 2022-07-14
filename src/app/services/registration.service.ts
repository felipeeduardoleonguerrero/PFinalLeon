import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Registration } from './registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  rootUrl="https://62b002803bbf46a3522a1694.mockapi.io/registration/";

  constructor(private http: HttpClient) {}
    
  //Traer lista de inscripciones de la MOCKAPI
  getRegistrationList():Observable<any> {
    return this.http.get<any>(this.rootUrl);
  }

    //Eliminación de inscripcripción

    removeRegistration(id:number):Observable<Registration> {
      return this.http.delete<Registration>(this.rootUrl + id);
    }

}