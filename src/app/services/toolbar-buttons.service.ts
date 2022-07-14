import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarButtonsService {

  constructor() { }

  asyncShare:any = "share";

  getAsyncShare():Observable<any> {

    return of(this.asyncShare);

  }
}
