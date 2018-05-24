import { NgModule, Directive, Input, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Directive({
    selector: '[iasync]',
    providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => IasyncValidator), multi: true
    }
  ]
})
export class IasyncValidator implements Validator {
    @Input('iasync') callBackFunction: Function ;
    @Input('iasyncData') asyncData: any ;
    constructor() { }
    validate (control: AbstractControl): Promise<{[key: string]: any}>|Observable<{[key: string]: any}> {
        if (!this.callBackFunction) {
          throw new Error('Function not attached/Defined for IASYNC validator');
        }
      if (!this.asyncData) {
        return this.callBackFunction(control.value);
      } else {
        return this.callBackFunction(this.asyncData);
      }
    }
}

