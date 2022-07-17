import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRegistrations } from '../Store/Features/Registration/registration.actions';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(loadRegistrations());
  }

}
