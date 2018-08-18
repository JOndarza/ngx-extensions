import { Component, ContentChild, forwardRef, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CounterLabelTemplateDirective } from './charactercounter.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'extensions-charactercounter',
  templateUrl: './charactercounter.template.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'charcounter',
    maxlength: 'maxlength',
    cols: 'cols',
    rows: 'rows',
    placeholder: 'placeholder'
  },
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CharacterCounterComponent),
      multi: true
    }
  ]
})
export class CharacterCounterComponent implements OnInit, ControlValueAccessor {
  @ContentChild(CounterLabelTemplateDirective, { read: TemplateRef })
  labelTemplate: TemplateRef<any>;

  @Input()
  public labelGenerator: (chars: number, max: number) => string;

  // #region Props
  private _asInput = false;
  @Input()
  public get asInput(): boolean {
    return this._asInput;
  }
  public set asInput(v: boolean) {
    this._asInput = v;
  }

  private _value: string;
  @Input()
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    this._onChange.call(null, (this._value = v));
    this._charNumber = v.length || 0;
  }

  private _maxlength: number = undefined;
  @Input()
  public get maxlength(): number {
    return this._maxlength;
  }
  public set maxlength(v: number) {
    this._maxlength = v;
  }

  private _charNumber = 0;
  public get charNumber(): number {
    return this._charNumber;
  }

  private _cols: number;
  @Input()
  public get cols(): number {
    return this._cols;
  }
  public set cols(v: number) {
    this._cols = v;
  }

  private _rows: number;
  @Input()
  public get rows(): number {
    return this._rows;
  }
  public set rows(v: number) {
    this._rows = v;
  }

  private _placeholder: string;
  @Input()
  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(v: string) {
    this._placeholder = v;
  }

  private _noResize: boolean;
  @Input()
  public get noResize(): boolean {
    return this._noResize;
  }
  public set noResize(v: boolean) {
    this._noResize = v;
  }

  private _disabled: boolean;
  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(v: boolean) {
    this.setDisabledState(v);
  }

  public get counter(): string {
    return this.labelGenerator(this._charNumber, this._maxlength);
  }
  // #endregion

  private _onChange = (value: string) => {};
  private _onTouched = () => {};

  ngOnInit(): void {
    this.labelGenerator = this.maxlength ? (chars, max) => `${chars} / ${max}` : chars => `${chars}`;
  }

  // #region ControlValueAccessor
  writeValue(obj: string): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
  // #endregion
}
