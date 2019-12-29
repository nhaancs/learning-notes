# Angular essentials

## I. Entities in Angular

### 1. Modules

Objects that help you organize dependencies into decrete units.

### 2. Components

Compose the majority of your application's structure and logic.

### 3. Directives

Objects that modify elements to give them new capabilities or change behaviors.

There are three categories of directives:

- Attribute directives: modify the appearance or behaviors of an element.
- Structural directives: modify the DOM tree base on some conditions.
- Components: directive that have template.

### 4. Pipes

Functions that format data before it's rendered without changing the underlying data value.

### 5. Services

Reusable objects for data access or helper utilities.

## II. How Angular begins to render an app (base app create with Angular CLI)

Bootstrapper begins App execution process --> App imports other modules --> App renders App Component --> Component binds property from controller to template

## III. Types of compilers

### 1. Just-in-Time (JiT)

The compiling of of the application happens in the browser only after the assets have all been loaded. That means there will be a lag between initially loading the page and being able to see the content. Usually used in development.

### 2. Ahead-of-Time (AoT)

Render the content before sending it to the browser, make it faster to see the content. Usually used in production.

## IV. Dependency injection (DI)

Dependency injection is the pattern for obtaining objects that uses a registry to maintain a list of available objects and a service that allows you to request the object you need. Angular Dependency injection system includes:

### 1. Injector

This is the service that Angular provides for requesting and registering dependencies.

`constructor(private http: HttpClient) {}`

### 2. Providers

Providers are responsible for creating the instance of the object requested. The injector knows the list of available providers, and based on the name (like HttpClient), it calls a factory function from the provider and returns the requested object.

Anything that has been registered with an NgModule's providers array is available to be injected in your application code.

Alternatively, you could use the @Inject decorator to inject the HttpClient, like this:

`constructor(private @Inject(HttpClient) http) {}`. By this way, providers are only visible to a particular component or component tree.

## V. Change detection

Mechanism for keeping data and the rerendered views in sync with one another. If parent component has changed, its children are also be checked.

Angular run a change detection process to check whether values have changed since the last time the process ran.

Angular has two ways for changes to be triggered:

- The Default mode will traverse the entire tree looking for changes with change detection process.
- The OnPush mode tell Angular that the component only cares about changes to any values that are input into the component from its parent, and give Angular the ability to skip checking the component during change detection if it already knows the parent hasn't changed.

Change detection is triggered by either events, receiving HTTP response, or timers/intervals (asynchronous calls).

## VI. Template expressions and bindings

### 1. Interpolation

`{{variable}}, {{10 + 20}}, {{getName()}}`

### 2. Property bindings

Bind values to properties of an element.

`<img [src]="user.img" />` does the same with `<img src="{{user.img}}" />`

Note: sometimes, properties are in camel case even if the HTML attribute isn't. For example, if you did interpolation `rowspan={{rows}}`, if you did property binding, you have to use `[rowSpan]="rows"`

### 3. Special property bindings

`[class.active]="isActive()"`

`[style.color]="getColor()`

`<h1 [style.light-height.em]="'2'">Title</h1>`

### 4. Attribute bindings

There aren’t many attributes that aren’t also properties, but if you come across a template parse error that your binding isn’t a known native property, you’re probably binding to one of these attributes.

`<input [attr.aria-required]="isRequired()" />`

`aria-required="{{isRequired()}}"` or `[aria-required]="isRequired()"` will cause template parsing error.

### 5. Event bidings

Binding back from our template into the component.

`<form (submit)="save()">...</form>`

Components and directives can emit there own events, and you can listen to those events.
