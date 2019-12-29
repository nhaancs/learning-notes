# Advanced component

## I. Change detection and optimization

Change detection -> determine when the component need to be rerendered

Changes are always triggered by some asynchronous activity:

- user clicks a button trigger a form submission (user activity)
- intervals, timers
- callbacks, observables, or promisses are resolved (XHR requests, event streams)

Change detection modes:

- `Default`: always check the component for changes on each change detection cycle.
- `OnPush`: only need to check for changes if one of the component inputs has changed. Don't check if the parent component have not changed.

=> Each time change detection run, `ngDoCheck` will be called

=> If changes detected, `ngOnChanges` will be call

## II. Communication between components

- Input: pass data to child component
- Output: pass data to parent component
- ViewChild: access to child component controller in controller
- Local variable: access to child component controller in a component's template

```html
<app-navbar (onRefresh)="dashboard.generateData()"></app-navbar>
<app-dashboard #dashboard></app-dashboard>
```

## III. View encapsolation modes

- None: component styles bleed out, global styles bleed in, templates are unmodified
- Emulated: component styles are isolated, global styles bleed in, templates are modified (add unique selectors)
- Native: use shadow DOM, parent and sibling styles bleed in, limitted support

## IV. Dynamically rendering components

When we dynamically render a component, it needs to know:

- what component to render
- where to render it
- and where it can get a copy of it

These are the Angular capabilities we’ll use to handle this process:

- `ViewContainerRef`: This is a reference to an element in the application that Angular understands and that gives us a reference point to where we can render our component.
- `ViewChild`: This will give us the ability to reference an element in our con- troller as a ViewContainerRef type, giving us access to APIs needed to render components.
- `ComponentFactoryResolver`: An Angular service that gets us the component factory (which is needed to render) for any component that has been added to `the entry components list`.

Example:

We’re going to build an alert box that appears when the data is refreshed and then removes itself after a certain amount of time.

Because this component will be dynamically rendered, we need to add it to the list of entryComponents in `app.modules.ts`

```typescript
entryComponents: [
  AlertComponent
],
```

We’ll need to create a template element in our application that can be used to render out. In `dashboard.component.html`:

```html
<app-navbar (onRefresh)="refresh()"></app-navbar>
<ng-template #alertBox></ng-template>
<app-dashboard></app-dashboard>
```

The #alertBox attribute is another template local variable that we can use to identify this element later on.

```typescript
export class AppComponent {
    // Creates two new properties for a reference to the component and a ViewChild
    alertRef: ComponentRef<AlertComponent>;
    @ViewChild('alertBox', {read: ViewContainerRef}) alertBox: ViewContainerRef;
    @ViewChild(DashboardComponent) dashboard: DashboardComponent;

    // Injects the component resolver into the controller
    constructor(private ComponentFactoryResolver: ComponentFactoryResolver) {}

    // Implements the alert method to create the component
    alert(date) {
        if (!this.alertRef) {
            // get component factory from entry components
            const alertComponent = this.ComponentFactoryResolver.
            resolveComponentFactory(AlertComponent);
            // create component in template
            this.alertRef = this.alertBox.createComponent(alertComponent);
        }
        // this.alertRef.instance is the component created
        this.alertRef.instance.date = date;
        // detect change manually
        this.alertRef.changeDetectorRef.detectChanges();
        // hide alert after 5s
        setTimeout(() => this.destroyAlert(), 5000);
    }

    // Implements the destroyAlert method to remove the component
    destroyAlert() {
        if (this.alertRef) {
            this.alertRef.destroy();
            delete this.alertRef;
        }
    }

    refresh() {
        this.dashboard.generateData();
    }
}
```

In AppComponent template:

```html
<app-dashboard (onRefresh)="alert($event)"></app-dashboard>
```
