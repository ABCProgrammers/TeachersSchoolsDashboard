import { Component, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from '../../core/services/header.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { HttpService } from '../../core/services/http.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
    icArrowLeft = faArrowLeft
    menuStatus: boolean = true;
    iscollapse: boolean = false;
    marginleft: number = 50;
    showTitle: boolean = true;
    isShowDrop: boolean = true;
    portalsList: any[] = [];
    pageTitle = '';
    portalList = [];
    @Output() sideNavToggled = new EventEmitter<boolean>();
    constructor(
        private _headerService: HeaderService,
        private _httpService: HttpService,
        public _tokenService: TokenStorageService,
        @Inject(DOCUMENT) private document: Document
    ) { }
    ngOnInit() {
        this._headerService.pageTitle.subscribe(title => this.pageTitle = title);
        this.getPortals();
    }
    getPortals() {
        this._httpService.get(this._httpService.apiUrl.User.GetUserPortals).subscribe((response: any) => {
            if (response.isSuccess) {
                this.portalList = response.data;
            }
        })
    }
    redirectTo(item: any) {
        var token = this._tokenService.getToken;
        const url = `${item?.description}/login?token=${token}&redirectUrl=${this.document.location.origin}`;
        window.location.replace(url)
    }
    SideNavToggle() {
        this.menuStatus = !this.menuStatus;
        this.sideNavToggled.emit(this.menuStatus);
        this.iscollapse = this.iscollapse == false ? true : false;
        this.marginleft = this.marginleft == 50 ? 0 : 50;
        if (window.innerWidth < 600) {
            this.iscollapse = true;
        }
        const menuItems = document.querySelectorAll('[dropdown]');
        menuItems.forEach(item => {
            item.setAttribute('container', 'body');
        })
    }
    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        if (window.innerWidth < 600) {
            this.iscollapse = true;
            this.marginleft = 0;
            this.menuStatus = false;
            this.sideNavToggled.emit(false);
            this.showTitle = false;
        } else {
            this.iscollapse = false;
            this.marginleft = 50;
            this.menuStatus = true;
            this.showTitle = true;
            this.sideNavToggled.emit(true);
        }
    }
}
