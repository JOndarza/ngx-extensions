import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import * as _ from 'lodash';

import { ILoader } from '../commons/interfaces/ILoader.interface';
import { NgCTableColComponent } from './components/table-col.component';
import { NgCTableRowTemplateDirective } from './table.directives';

export type PaginationClasses =
  | 'ngc-table-actual-page'
  | 'ngc-pagination-start'
  | 'ngc-pagination-end'
  | 'ngc-pagination-next'
  | 'ngc-pagination-back';

export interface INgCTablePagination {
  value: number;
  label?: any;
  class?: string | PaginationClasses;
  isIcon?: boolean;
}

@Component({
  selector: 'ngc-table',
  templateUrl: './table.template.html',
  styleUrls: ['./table.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgCTableComponent<T = any>
  implements OnInit, AfterViewInit, ILoader {
  //#region Refs
  @ContentChildren(NgCTableColComponent)
  private _cols: QueryList<NgCTableColComponent>;
  public get cols() {
    return this._cols;
  }

  @ContentChild(NgCTableRowTemplateDirective, {
    static: true,
    read: TemplateRef,
  })
  private _rowTemplate: TemplateRef<any>;
  public get rowTemplate() {
    return this._rowTemplate;
  }
  //#endregion

  //#region Props
  @Input()
  public class: string = 'default';

  private _collection: Array<T> = [];
  @Input()
  public get collection() {
    return this._collection;
  }
  public set collection(v: Array<T>) {
    this._collection = v || [];
    this.resetConfig();
  }

  private _page: number;
  @Input()
  public get page() {
    return this._page;
  }
  public set page(v: number) {
    this._page = v || 1;
    this.configData();
  }

  private _rowsPerPage: number;
  @Input()
  public get rowsPerPage() {
    return this._rowsPerPage;
  }
  public set rowsPerPage(v: number) {
    this._rowsPerPage = v || undefined;
    this.configData();
  }

  private _firstColsFreezed: number;
  @Input()
  public get firstColsFreezed() {
    return this._firstColsFreezed;
  }
  public set firstColsFreezed(v: number) {
    this._firstColsFreezed = v || undefined;
    this.configData();
  }

  private _range: number = 5;
  @Input()
  public get paginationRange() {
    return this._range;
  }
  public set paginationRange(v: number) {
    this._range = v || 5;
    this.configData();
  }

  @Input()
  public loading: boolean;
  //#endregion

  private _data: Array<T> = [];
  public get data() {
    return this._data;
  }

  private _pagination: Array<INgCTablePagination> = undefined;
  public get pagination() {
    return this._pagination;
  }

  private _col: NgCTableColComponent;

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    //
  }

  ngAfterViewInit(): void {
    // setTimeout(this.configData.bind(this), 250);
  }

  //#region Events
  public headerClick(col: NgCTableColComponent) {
    if (!col.sortable) return;

    this._col = col;
    this.cols.filter((x) => x !== this._col).forEach((x) => (x.sort = 'none'));
    this._col.configSort();

    this.configData();
    this.refresh();
  }
  ////#endregion

  //#endregion Publics
  public refresh() {
    this._cdRef.detectChanges();
  }

  public resetConfig() {
    this._data = this._collection;
    this._col = undefined;
    this._page = 1;
    this.configData();
  }
  //#endregion

  //#region Privates
  private configData() {
    this.loading = true;

    // Sorting
    let data: Array<T>;
    if (!!this._col) {
      data = _.orderBy(
        this.collection,
        (x) => x[this._col.bind],
        this._col.sort as any
      );
    } else data = this.collection;

    // Pagination
    if (this.rowsPerPage > 1) {
      const lots = Math.ceil(this.collection.length / this.rowsPerPage);
      if (this.page > lots) this._page = lots;

      data = data.slice(
        (this.page - 1) * this.rowsPerPage,
        this.page * this.rowsPerPage
      );

      this._pagination = this.configPagination(lots, this.page);
    } else {
      this._page = 1;
      this._pagination = undefined;
    }

    this._data = data;

    this.loading = false;
  }

  private configPagination(lots: number, actualPage: number) {
    let pagination: Array<INgCTablePagination>;
    const outRange = lots > this.paginationRange;
    if (outRange) {
      const f = Math.floor(this.paginationRange / 2);
      let fixedRange = [0];

      for (let i = 1; i <= f; i++) {
        fixedRange.push(i);
        fixedRange.push(-i);
      }
      fixedRange = fixedRange.map((x) => x + actualPage);

      // Negatives
      fixedRange = fixedRange.filter((x) => x > 0);
      let diff: number;
      if (fixedRange.length < this.paginationRange) {
        diff = this.paginationRange - fixedRange.length;
        while (diff > 0) {
          fixedRange.push(actualPage + f + diff);
          diff--;
        }
      }
      // Over lots
      fixedRange = fixedRange.filter((x) => x <= lots);
      if (fixedRange.length < this.paginationRange) {
        diff = this.paginationRange - fixedRange.length;
        while (diff > 0) {
          fixedRange.push(actualPage - f - diff);
          diff--;
        }
      }

      pagination = _.orderBy(fixedRange, (x) => x).map((x) => {
        return {
          value: x,
          label: x,
        } as INgCTablePagination;
      });
    } else
      pagination = Array.from(Array(lots).keys()).map((x) => {
        return {
          value: x + 1,
          label: x + 1,
        } as INgCTablePagination;
      });

    let toInit = true;
    let toLast = true;
    if (pagination[0].value === 1) toInit = false;
    if (pagination[pagination.length - 1].value === lots) toLast = false;

    const before: Array<INgCTablePagination> = [];
    const after: Array<INgCTablePagination> = [];
    if (outRange && toInit)
      before.push({ value: 1, class: 'ngc-pagination-start', isIcon: true });
    if (actualPage !== 1)
      before.push({
        value: actualPage - 1,
        class: 'ngc-pagination-back',
        isIcon: true,
      });
    if (actualPage !== lots)
      after.push({
        value: actualPage + 1,
        class: 'ngc-pagination-next',
        isIcon: true,
      });
    if (outRange && toLast)
      after.push({ value: lots, class: 'ngc-pagination-end', isIcon: true });

    pagination.find((x) => x.value === actualPage).class =
      'ngc-table-actual-page';

    pagination = [...before, ...pagination, ...after];

    return pagination;
  }
  //#endregion
}
