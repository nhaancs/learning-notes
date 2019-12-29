# Building custom directives and pipes

## I. Custom directives

**Directives don't have template**

**Directives can inject services**

There are **two types of diredtives**:

* **attribute**: when you want to change a property of an element (such as the background color or height)
* **structural**: when you want to have control over how the element itself is rendered into the page

### 1. Attribute directives

``` typescript
@Directive({
    selector: '[cardType]'
})
export class CardTypeDirective implements OnInit {
    // By defining one by the same name as the directive selector,
    // we can then bind to the directive, like <div [cardType]="stock"></div>.
    @Input() cardType: number = 0;
    @Input() increaseClass = 'increase';
    @Input() decreaseClass = 'decrease';

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (this.cardType) {
            if (this.cardType >= 0) {
                this.el.nativeElement.classList.add(this.increaseClass);
                this.el.nativeElement.classList.remove(this.decreaseClass);
            } else if (this.cardType <= 0) {
                this.el.nativeElement.classList.add(this.decreaseClass);
                this.el.nativeElement.classList.remove(this.increaseClass);
            } else {
                this.el.nativeElement.classList.remove(this.increaseClass);
                this.el.nativeElement.classList.remove(this.decreaseClass);
            }
        }
    }
}

```

More:

- Query an element

```typescript
this.card = this.el.nativeElement.querySelector('.mdl-card');
```

- Listen to an event

```typescript
@HostListener('mouseover') onMouseOver() {
    this.card.style.boxShadow = '2px 2px 1px #999';
    this.card.style.top = '-2px';
} 
```

### 2. Structural directives

When the structural directive is rendered by Angular, it creates a placeholder space, called an embedded view, where the directive can decide what to insert inside of this new view container. Using the ViewContainerRef, we can access this view and create any number of views.

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from
'@angular/core';
@Directive({
   selector: '[delay]'
})
export class DelayDirective {
    @Input() set delay(ms: number) {
        setTimeout(() => {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }, ms);
    }
    // TemplateRef are references to the template of the element our directive is attached to and
    // ViewContainerRef is a reference to the view that contains it.
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }
}
```

```html
<div class="mdl-cell mdl-cell--3-col" *ngFor="let stock of stocks; index as i">
    <summary [stock]="stock" *delay="i * 100" cardTone></summary>
</div>
```

Now back to the business of the `*` in structural directives. We didn’t have a TemplateRef or ViewContainerRef in our attribute directives, and the `*` is the syntactic way to describe to Angular that this directive needs to capture the template and create a view container before the element is rendered.

## II. Custom pipes

There are two types of pipes:

- **Pure pipes** maintain no state infomation, only run if the input value passed into the pipe has changed.
- **Impure pipes** maintain state, will execute on every change detection run because an impure pipe has state that might have changed.

### 1. Pure pipe

```typescript
@Pipe({
    name: 'change'
})
export class ChangePipe implements PipeTransform {
    constructor(private currencyPipe: CurrencyPipe, private percentPipe: PercentPipe) {}

    transform(stock: StockInterface, showPercent: boolean = true): any {
        let value = `${this.currencyPipe.transform(stock.change, 'USD', 'symbol', '.2')}`;
        if (showPercent) {
            value += ` (${this.percentPipe.transform(stock.changeInPercent, '.2')})`;
        }
        return value;
    }
}
```

```html
{{stock | change}}

{{stock | change:false}}
```

### 2. Impure pipe

```typescript
@Pipe({
    name: 'changeDetector',
    pure: false
})
export class ChangeDetectorPipe implements PipeTransform {
    count: number = 0;
    transform(value: any, args?: any): any {
        this.count++;
        console.log(`Component change detection executed ${this.count} times`);

        return value;
    }
}
```

```html
<span class="mdl-layout-title">{{'Stock Tracker' | changeDetector}}</span>
```

Or

```typescript
@Pipe({
 name: 'news',
 pure: false
})
export class NewsPipe implements PipeTransform {
    cachedSource: string = '';
    news: string = 'loading...';
    constructor(private service: StocksService) {}
    transform(source: string, args?: any): any {
        if (source !== this.cachedSource) {
            this.cachedSource = source;
            this.service.getNewsSnapshot(source).subscribe(news => {
                this.news = `<a href="${news.url}" target="_blank">${news.title}</a>`;
            });
        }
        return this.news;
    }
}
```

```html
<span>Top News Headline: <span [innerHTML]="'cnbc' | news"></span></span>
```

You may wonder how Angular knows when the API request has completed. Well, because we’re using the Angular HttpClient service under the hood, Angular is aware of when that response has finished, and that triggers another round of change detection. Because this is an impure pipe, it’s run again, and the news value will be rendered.
