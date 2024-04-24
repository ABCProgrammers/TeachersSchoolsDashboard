import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  pageTitle = new BehaviorSubject('Set Title');
  constructor() { }
  setTitle(title: any) {
    this.pageTitle.next(title);
  }
}
