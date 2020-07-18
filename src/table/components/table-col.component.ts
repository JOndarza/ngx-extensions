import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgCTableCellTemplateDirective } from 'table/table.directives';

export type Sorting = 'none' | 'desc' | 'asc';

@Component({
  selector: 'ngc-table-col',
  template: ``,
})
export class NgCTableColComponent {
  @ContentChild(NgCTableCellTemplateDirective, {
    static: true,
    read: TemplateRef,
  })
  private _cellTemplate: TemplateRef<any>;
  public get cellTemplate() {
    return this._cellTemplate;
  }

  @Input()
  public class: string;

  @Input()
  public title: string;

  @Input()
  public bind: string;

  @Input()
  public sortable: boolean = true;

  @Input()
  public sort: Sorting = 'none';

  public configSort() {
    switch (this.sort) {
      case 'none':
      case 'asc':
        this.sort = 'desc';
        break;

      default:
        this.sort = 'asc';
        break;
    }
  }
}
