import {
  AfterContentInit,
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  TemplateRef,
  ContentChildren,
  QueryList,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { cloneDeep, get } from 'lodash';
import { faArrowUpLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';

import { TableColumn, TableConfig, TableSort } from './table-advanced-interfaces';
import { TableAdvancedColumnDirective } from './table-advanced.directives';
import { HttpService } from '../../../core/services/http.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'table-advanced',
  templateUrl: './table-advanced.component.html',
  styleUrls: ['./table-advanced.component.scss'],
})
export class TableAdvancedComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() config: TableConfig = {};
  @Input() loading = false;
  @Input() page: number = 1;
  @Input() pageCount: number = 1;
  @Input() limit: number = 6;
  @Input() total: number = 0;
  @Input() columns: TableColumn[] = [];
  @Input() sort: TableSort = { column: null, direction: false };
  @Input() data: any[] = [];

  @Output() pageUpdated = new EventEmitter<number>();
  @Output() sortUpdated = new EventEmitter();
  @Output() eventData = new EventEmitter();

  @ContentChildren(TableAdvancedColumnDirective)
  templateColumnRefs!: QueryList<TableAdvancedColumnDirective>;

  columnTemplates!: { [key: string]: TemplateRef<any> };
  tempData: any[] = [];

  faArrowUpLong = faArrowUpLong;
  faArrowDownLong = faArrowDownLong;
  @ViewChild('inputFile') inputFile: ElementRef
  constructor(private _httpService: HttpService, private _datePipe: DatePipe, private _decimalPipe: DecimalPipe) {

  }
  ngOnInit() {
    if (this.config.initSort) {
      this.sort = this.config.initSort;
    }
  }

  ngAfterContentInit() {
    this.columnTemplates = this.templateColumnRefs.reduce(
      (acc: any, cur: TableAdvancedColumnDirective) => {
        acc[cur.name] = cur.template;
        return acc;
      }, {}
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.tempData = cloneDeep(this.data || []);
    }
  }

  isSortColumnMatch(column: TableColumn) {
    return this.sort?.column === column.key;
  }

  onSort(column: TableColumn) {
    if (!column.canSort || !this.tempData.length) {
      return;
    }
    if (this.isSortColumnMatch(column)) {
      if (this.sort.direction === 'asc') {
        this.sort.direction = 'desc';
        this.sort.column = column.key;
      } else if (this.sort.direction === 'desc') {
        this.sort.direction = false;
        this.sort.column = null;
      } else {
        this.sort.direction = 'asc';
        this.sort.column = column.key;
      }
    } else {
      this.sort.direction = 'asc';
      this.sort.column = column.key;
    }
    this.sortUpdated.emit(this.sort);
  }

  onPageChange(page: number) {
    this.pageUpdated.emit(page);
  }

  getItemValue(item: any, key: string, columnIndex: number) {
    if (!get(item, key)) {
      return this.columns[columnIndex]?.placeholder;
    }
    else {
      if (this.columns[columnIndex]?.dateFormat) {
        return this._datePipe.transform(item[key], this.columns[columnIndex].dateFormat)
      }
      else if (this.columns[columnIndex]?.currency?.decimalFormat) {
        let value = this._decimalPipe.transform(item[key], this.columns[columnIndex].currency.decimalFormat) + this.columns[columnIndex].currency.appendText;
        return value;
      }
      else {
        return get(item, key);
      }
    }
  }

  getColumnByKey(key: string) {
    return this.columns.find(s => s.key === key);
  }

  onFileChange(event) {
    let files = [...event.target.files];
    if (files.length > 0) {
      files.forEach((file: File) => {
        this._httpService._helperService.fileToBase64(file).then((response: any) => {
          this.eventData.emit({ import: 'import', file: response.file });
          this.inputFile.nativeElement.value = null;
          //(document.getElementById('fileId') as HTMLInputElement).value = null;
        })
      })
    }
  }
}
