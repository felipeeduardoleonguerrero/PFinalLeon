import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCoursess } from '../Store/Features/Courses/courses.actions';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCoursess());
  }

}
