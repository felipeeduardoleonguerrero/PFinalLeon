import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Users } from '../sidenav/users/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //En caso de falso, el usuario no puede navegar el sitio.

  adminLoggedIn = true;

  userLoggedIn = true;

  //MOCKAPI Usuarios

  rootUrl="https://62a7cf5197b6156bff933692.mockapi.io/api/v1/roles/";

  userToEdit:any;

  constructor(private http: HttpClient) { }

  //Autenticación del usuario. En caso contrario los Guards bloquearan el acceso al resto del sitio.
  
  adminsLogIn() {
    this.adminLoggedIn = true;
    this.userLoggedIn = true;
  }

  usersLogIn() {
    this.userLoggedIn = true;
  }

  getUserToEdit():Observable<any> {

    return of(this.userToEdit);

  }

  //Traer lista de ususuarios de la MOCKAPI

  getUsersList():Observable<any> {
    
    return this.http.get<any>(this.rootUrl);

  }

  //Adición de estudiante: Uso de MOCKAPI

  postUser(user:any):Observable<Users> {

      return this.http.post<Users>(this.rootUrl, user);

  }

  //Actualizar usuario

  updateUser(user:Users):Observable<Users>{

    return this.http.put<Users>(this.rootUrl + `/${user.id}`, user)

  }

  //Eliminación de usuario

  removeUser(id:number):Observable<Users> {

    return this.http.delete<Users>(this.rootUrl + id);

  }

  //Cerrar sesión

  signOut(){
    this.adminLoggedIn=false;
    this.userLoggedIn=false;
  }

  //

  adminStatus():Observable<any> {

    return of(this.adminLoggedIn);

  }

}
