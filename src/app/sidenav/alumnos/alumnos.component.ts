import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStudentss } from '../Store/Features/Students/students.actions';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  constructor(private store:Store<any>) { }

  ngOnInit() {
    this.store.dispatch(loadStudentss());
  }

}
