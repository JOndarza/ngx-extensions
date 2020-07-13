import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgCTableColComponent } from './components/table-col.component';
import { NgCTableComponent } from './table.component';
import { NgCTableRowTemplateDirective } from './table.directives';

const _components = [NgCTableComponent, NgCTableColComponent];
const _directives = [NgCTableRowTemplateDirective];
const _declarations = [..._components, ..._directives];
const _externs = [];

const _exports = [..._declarations, ..._externs];
const _imports = [..._externs, CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: _declarations,
  exports: _exports,
  imports: _imports,
  providers: [],
})
export class TableModule {
  static forRoot(): ModuleWithProviders<TableModule> {
    return {
      ngModule: TableModule,
      providers: [],
    };
  }
}
