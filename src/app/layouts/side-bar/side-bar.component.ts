import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IMenu } from "./IMenu";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

export enum ChildrenMenuEnum {
  SPARE_PARTS_ORDERS = 1,
  SPARE_PARTS_LIBRARY = 2,
  SETTINGS = 3
}

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})

export class SideBarComponent {
  home = faHome;
  menu: IMenu[] = [];
  @Input() sideNavStatus: boolean = true;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() titleOfPage = new EventEmitter<string>(); 
  env = environment;
  isShowLookups = true;
  constructor(private router: Router){

  }
  ngOnInit() {
    this.initMenu();
  }
  
  initMenu() {
    this.menu = [
      {
        name: "Suppliers Management",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items-suppliers",
      },
      {
        name: "Items Categories",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items-categories",
      },
      {
        name: "Warehouses Management",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items-locations",
      },
      {
        name: "Items Name",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items-name",
      },
      {
        name: "Items Bundle",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items-bundle",
      },
      {
        name: "Items Tariff",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items-tariff",
      },
      {
        name: "Items",
        iconLight: "/assets/images/icons/menu/notes.svg",
        routeName: "/items",
      },
    ];
  }
  logout() {
    let redirectURL = localStorage.getItem("redirectUrl");
    window.location.replace(redirectURL);
    localStorage.clear();
    localStorage.setItem("redirectUrl", redirectURL);
  }
}
