import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';
import { UsersService } from 'src/app/services/users.service';
import { UsersRoutingModule } from '../users-routing.module';
import { UsersListComponent } from './users-list.component';
import { of } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule

      ],
      providers: [
        UsersService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    usersService=TestBed.inject(UsersService);
    spyOn(usersService, "getUsersList").and.returnValue(
      of (
        [
          {
            id: 1,
            sname:'Felipe',
            password: 'León',
            role: 'admin'
          }
        ]
      )
    )
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Debería haber traido getUsers al inicializar.', () => {
  //   expect(component.getUsers.length>0).toBeTruthy();
  // });

  //Prueba para eliminación de usuarios

  it('Debería llamar a removeUser en el servicio al momento de ejecutar el deleteUser.', () => {
    const deleteSpy=spyOn(usersService, 'removeUser').and.returnValue(
      of ({
        id: 1,
        sname:'Felipe',
        password: 'León',
        role: 'admin'
      })
    )
    component.deleteUser(1);
    expect(deleteSpy).toHaveBeenCalled();
  });

});
