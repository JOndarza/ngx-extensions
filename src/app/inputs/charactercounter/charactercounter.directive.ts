import { Directive, TemplateRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[ng-label-tmp]' })
export class CounterLabelTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
