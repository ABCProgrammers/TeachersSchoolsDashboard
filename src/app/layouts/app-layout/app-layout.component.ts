import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  sidebarExpanded = true;
  Pagetitle: any = {};
  navList: any = [];
  titleOfPage: any = '';
  isShrinked: boolean = true;
}
