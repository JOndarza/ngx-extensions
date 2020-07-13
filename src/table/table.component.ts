import {
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { ILoader } from '../commons/interfaces/ILoader.interface';
import { NgCTableColComponent } from './components/table-col.component';
import { NgCTableRowTemplateDirective } from './table.directives';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngc-table',
  templateUrl: './table.template.html',
  styleUrls: ['./table.styles.scss'],
})
export class NgCTableComponent<T = any> implements OnInit, ILoader {
  // #region Refs
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
  // #endregion

  // #region Props
  private _collection: Array<T> = [];
  @Input()
  public get collection() {
    return this._collection;
  }
  public set collection(v: Array<T>) {
    this._collection = v || [];
  }

  @Input()
  public freezeFirstCol: boolean;

  @Input()
  public loading: boolean;
  // #endregion

  ngOnInit(): void {
    if (this.rowTemplate) this.rowTemplate.createEmbeddedView(this);

    console.table(this.collection);
  }

  public headerClick(col: NgCTableColComponent) {
    console.log(col);
  }
}
