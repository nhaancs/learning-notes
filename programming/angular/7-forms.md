# Forms

## I. Template-driven forms

### 1. NgModel

By adding the NgModel directive we can turn it into an Angular form control. In the process, we can also remove the value attribute, as it’s no longer needed:

```html
<input name="customer" mdInput placeholder="Customer Name" [(ngModel)]="customer.name">
```

1 way/ 2 ways binding

### 2. Validating form controls with NgModel

Html built-in validations: `required`, `minlength`, ...

```html
<md-input-container>
    <input name="phone" mdInput type="tel" placeholder="Phone" [(ngModel)]="customer.phone" required #phone="ngModel" minlength="7">
    <md-error *ngIf="phone.touched && phone.errors?.required">
        Phone number is required
    </md-error>
    <md-error *ngIf="phone.touched && phone.errors?.minlength">
        Not a valid phone number
    </md-error>
</md-input-container>
```

### 2. Custom validation with directives

We’ll need to create two things to make this happen:

- a customer validator function
- a directive that uses the validator function

```typescript
// Then inside of the validation function, it tests the current value against the expression and returns either null, to mean it’s valid, or an object if it’s invalid, with a property explaining what is invalid (can be everything).

export function PhoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const valid = expression.test(control.value) && control.value.length < 14;
        return valid ? null : { phone: true };
    };
}
```

```typescript
// We start by defining the selector to expect to have both phone and NgModel attributes on the form control. This means if you just put phone as an attribute, it won’t use this directive for validation, because NgModel is required

@Directive({
    selector: '[phone][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }]
})
export class PhoneDirective implements Validator {
    private validator = PhoneValidator();

    validate(control: AbstractControl): { [key: string]: any } {
        return this.validator(control);
    }
}
```

```html
<md-input-container>
    <input name="phone" mdInput type="tel" placeholder="Phone" [(ngModel)]="customer.phone" required phone #phone="ngModel">
    <md-error *ngIf="phone.touched && phone.errors?.phone">
        Not a valid phone number
    </md-error>
</md-input-container>
```

### 3. Handling submit or cancel events

The first thing we should do is update our form element. Angular does another thing to forms that isn’t visible by default.

It automatically implements an NgForm on a form even if you don’t declare a directive (unlike how you have to declare NgModel).

When it does this, it essentially attaches an NgForm controller that then maintains the form controls in the form.

```html
<form *ngIf="customer" #form="ngForm" (ngSubmit)="save()">
...
<button type="submit" md-raised-button color="primary" [disabled]="form.invalid">Save</button>
```

## II. Reactive forms

### 1. Setup reactive form

```typescript
export class InvoiceFormComponent implements OnInit {
    invoiceForm: FormGroup;
    invoice: Invoice;

    constructor(
        private loadingService: TdLoadingService,
        private invoicesService: InvoicesService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.invoiceForm = this.formBuilder.group({
            id: [''],
            service: ['', Validators.required],
            customerId: ['', Validators.required],
            rate: ['', Validators.required],
            hours: ['', Validators.required],
            date: ['', Validators.required],
            paid: ['']
        });
    }

    ngOnInit() {
        this.route.params.map((params: Params) => params.invoiceId)
            .subscribe(invoiceId => {
                if (invoiceId) {
                    this.invoicesService.get<Invoice>(invoiceId).subscribe(invoice => {
                        this.invoiceForm.setValue(invoice);
                        this.invoice = invoice;
                        this.loadingService.resolve('invoice');
                    });
                } else {
                    this.invoice = new Invoice();
                    this.loadingService.resolve('invoice');
                }
            });
    }
}
```

```html
<div *tdLoading="'invoice'">
    <form *ngIf="invoice" [formGroup]="invoiceForm">
        <md-card>
            <md-card-header>Edit Invoice</md-card-header>
            <md-card-content>
                <md-input-container>
                    <input name="service" mdInput type="text" placeholder="Service" formControlName="service">
                </md-input-container>

                <md-input-container>
                    <input mdInput [mdDatepicker]="picker" placeholder="Choose a date" formControlName="date">
                    <button type="button" mdSuffix [mdDatepickerToggle]="picker"></button>
                </md-input-container>

                <md-datepicker #picker></md-datepicker>

                <md-input-container>
                    <input name="hours" mdInput type="number" placeholder="Hours" formControlName="hours">
                </md-input-container>

                <md-input-container>
                    <input name="rate" mdInput type="number" placeholder="Rate" formControlName="rate">
                </md-input-container>

                <div>
                    <md-select name="customerId" placeholder="Customer"
                    formControlName="customerId">
                        <md-option [value]="customer.id" *ngFor="let customer of customers">
                            {{customer?.name}}
                        </md-option>
                    </md-select>
                </div>

                <div class="toggler">
                    <md-slide-toggle formControlName="paid">Paid</md-slide-toggle>
                </div>

                <div class="total">
                    Total: {{total | currency:'USD':true:'.2'}}
                </div>
            </md-card-content>
            <md-card-actions>
                <button type="button" md-button>Delete</button>
                <button type="button" md-button>Cancel</button>
                <button type="submit" md-raised-button color="primary">Save</button>
            </md-card-actions>
        </md-card>
    </form>
</div>
```

**Nested Forms**: also nested form groups in template.

**FormArray**

### 2. Watching changes

```typescript
Observable.combineLatest(
    this.invoiceForm.get('rate').valueChanges,
    this.invoiceForm.get('hours').valueChanges
).subscribe(([rate = 0, hours = 0]) => {
    this.total = rate * hours;
});
```

This snippet might be new to you, but we’re using the combineLatest operator from RxJS.

This operator takes two observables, which are references to the stream of value changes of the rate and hours controls, and merges them into one.

We can then get the latest values from the stream and multiply them to get the current total.

### 3. Custom validators with reactive forms

With reactive forms, we only need to create the validation function and then add it into the form when we create it with FormBuilder.

We haven’t looked at `async validators`, but the only difference is that they might take a moment to run.

Imagine you needed a validator that checked whether a username was already taken; that probably requires making an API call.

**Async validator**: The only difference when you implement an async validator is that you need to return a promise or observable, and Angular handles it. Use `formControl.pending` to show loading status while async validators working.

**Validate upon submit**: Use `AbstractControl.setErrors` (`AbstractControl` is a parent of `FormControl`, `FormGroup` and `FormArray`)

## III. Custom form controls

Angular provides the `ControlValueAccessor` interface as a way to implement a custom control that works with forms.

`hours-control.component.ts`

```typescript
// This component really has three roles:
// - First, it implements an internal model to track the current value of the control (the number of hours) and allows that value to be manipulated by buttons or keypresses.
// - Second, it provides validation and ensures the number provided is to a quarter of an hour.
// - Third, it wires up the necessary methods for Angular forms to be made aware of the current state of the control.

@Component({
    selector: 'app-hours-control',
    templateUrl: './hours-control.component.html',
    styleUrls: ['./hours-control.component.css'],
    providers: [
        // This marks this component as a form control and registers it with dependency injection so Angular can access it later
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HoursControlComponent),
            multi: true
        },
        // This control has validation internally, so we need to register the control on the validators provider for Angular to access later
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => HoursControlComponent),
            multi: true
        }
    ]
})
export class HoursControlComponent implements ControlValueAccessor {
    hours = 0;
    validateFn = HoursValidator;
    onChange = (v: any) => {};

    update() {
        this.onChange(this.hours);
    }

    keypress($event) {
        if ($event.key === 'ArrowUp') {
        this.setValue(.25);
        } else if ($event.key === 'ArrowDown') {
            this.setValue(-.25);
        }
    }

    setValue(change: number) {
        this.hours += change;
        this.update();
    }

    // Because the control has a validate method, Angular can call this method to determine
    // whether the control is valid or not. This is the same as with creating a Validator directive as we did earlier
    validate(control: FormControl) {
        return this.validateFn(control);
    }

    // The writeValue method is used by Angular to pass a value into the form control from the form itself. This is similar to binding a value into the component, though it works with the form controls like NgModel, and it passes the value from the form into the control.
    writeValue(value: any) {
        if (value !== undefined) {
            this.hours = value;
        }
    }

    // The registerOnChange method accepts a function that the form library will pass in that your control needs to call whenever the value changes. It stores this function on the onChange property of the controller, and the default noop function is defined so the component compiles correctly. In other words, it gives you a method to call that passes the current form value up to the form.
    registerOnChange(fn) {
        this.onChange = fn;
    }

    // The registerOnTouch method isn’t implemented here, but it allows you to accept a method to handle touch events. This might be useful on controls that have some kind of touch impact, such as a toggle switch. But there isn’t much for us to implement for a form control that takes a number input.
    registerOnTouched() {}
}
```

`hours-control.component.html`

```html
<md-input-container>
    <input
        name="hours"
        mdInput
        type="number"
        placeholder="Hours"
        [(ngModel)]="hours"
        hours
        (keyup)="keypress($event)"
        #control="ngModel"
        (change)="update()"
        >
    <md-error *ngIf="control.touched && control.invalid">
        Hours must be a number in increments of .25
    </md-error>
</md-input-container>

<div layout="row">
    <button type="button" md-button flex (click)="setValue(1)">+ 1</button>
    <button type="button" md-button flex (click)="setValue(.25)">+ .25</button>
    <button type="button" md-button flex (click)="setValue(-.25)">- .25</ebutton>
    <button type="button" md-button flex (click)="setValue(-1)">- 1</button>
</div>
```

` Hours validation directive`

```typescript
@Directive({
    selector: '[hours][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: HoursDirective, multi: true }]
})
export class HoursDirective implements Validator {
    private validator = HoursValidator;
    validate(control: AbstractControl): { [key: string]: any } {
        return this.validator(control);
    }
}
```

Because this is a custom form control, we can use it with reactive forms or template-driven forms without issue.

```html
<app-hours-control formControlName="hours"></app-hours-control>
``

Custom controls seem like a great idea, but they can also be a lot of work to build properly.

For example, does your custom control work well on mobile or touch devices? Does it have proper support for screen readers and other accessibility requirements? Does it work in multiple applications or is it too custom for your application?

These are important questions to ask, and also to verify whether your controls work for the largest set of users. One of the major reasons I advocate using an existing UI library is that the good libraries will have solved these issues ahead of time for you.
