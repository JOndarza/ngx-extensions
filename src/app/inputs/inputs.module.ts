import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterCounterComponent } from './charactercounter/charactercounter.component';
import { CounterLabelTemplateDirective } from './charactercounter/charactercounter.directive';
@NgModule({
  declarations: [CharacterCounterComponent, CounterLabelTemplateDirective],
  exports: [CharacterCounterComponent, CounterLabelTemplateDirective],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class NgxExtensionsInputsModule {}
