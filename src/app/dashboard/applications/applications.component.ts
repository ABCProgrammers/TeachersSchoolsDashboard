import { Component } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { HeaderService } from '../../core/services/header.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableColumn, TableConfig } from '../../shared/components/table-advanced/table-advanced-interfaces';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  pageNo = 1;
  total = 0;
  limit = 6;
  tableConfig: TableConfig = {
    paging: true,
    filter: {
      Sort: 1,
      PageSize: this.limit,
    },
    hideTotalRecord: true,
  };
  tableColumns: TableColumn[] = [];
  jobList = [];
  constructor(
    private fb: FormBuilder,
    private _modalService: NgbModal,
    private _headerService: HeaderService,
    private _httpService: HttpService
  ) {
    this._headerService.setTitle("Applications");
  }
  ngOnInit() {
    this.initTableColumns();
    this.total = 8;
    this.jobList = [
      {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      },
      {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      }, {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      },
      {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      }, {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      },
      {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      }, {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      },
      {
        pos: 'Manger',
        exp: '10',
        cd: '20-12-2023',
        deadline: '3-02-2363',
        city: 'Lahore',
        type: 'Full Time',
        place: 'Karachi',
        noOfApp: '6045',
      },
    ]
  }
  onSortChange(sort: any) {
    if (sort?.direction && sort?.column) {
      switch (sort.column) {
        case "lookupName":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 3 : 2;
          break;
        case "lookupType.lookupTypeName":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 5 : 4;
          break;
        case "lookupValue":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 7 : 6;
          break;
        case "enterDate":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 9 : 8;
          break;
        case "lookupStatic":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 11 : 10;
          break;
        case "status":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 13 : 12;
          break;
        case "status123":
          this.tableConfig.filter.Sort = sort.direction === "desc" ? 15 : 14;
          break;
        default:
          break;
      }
    } else {
      this.tableConfig.filter.Sort = 1;
    }
  }

  onPageChange(page: number) {
    this.pageNo = page;
  }
  initTableColumns() {
    this.tableColumns = [
      { key: "pos", label: "Job" },
      { key: "exp", label: "Teacher" },
      { key: "cd", label: "Subject" },
      { key: "deadline", label: "Experience" },
      { key: "city", label: "Comment" },
      { key: "type", label: "Submitted On" },
      { key: "place", label: "CV" },
      { key: "noOfApp", label: "No Of Applicants" },
      { key: "status", label: "Status"},
      { key: "action", label: "Actions" },
    ];
  }
}
