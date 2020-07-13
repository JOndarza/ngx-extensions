import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngc-table-col',
  template: ``,
})
export class NgCTableColComponent {
  @Input()
  public title: string;

  @Input()
  public bind: string;

  @Input()
  public sortable: boolean;
}
