# Component basics

## I. Composition of a component

### 1. Component metadata decorator @Component()*

### 2. Controller*

### 3. Template*

### 4. Input

### 5. Output

### 6. Styles and encapsulation

### 7. Animations

### 8. Lifecycle hooks

### 9. Providers and hosts

Services can be injected directly into component if they're not already provided at the root level module.

## II. Component lifecycle & lifecycle hooks

### 1. Component lifecycle

#### a. Component registered with the module -->

There is a registry of components that belong to the module.

#### b. Template includes a component -->

#### c. Component is instantiated -->

Metadata is read.

#### d. Controller constructor() called -->

Child components are not available at this time yet.

#### e. Compiler renders any child components in template <-->

Component lifecycle hooks begin. Child components rendering won't stop the component from continue to render.

#### f. Application state changes -->

Components will be updated.

#### g. When component is no longer needed, component removed from the view

### 2. Lifecycle hooks

#### a. OnChanges

Fires any time the input bindings have changed.

#### b. OnInit

This run once after the components has fully initialized (though not necessarily when all child components are ready), which is after the first OnChanges hook.

#### c. OnDestroy

Before the component is completely removed.

#### d. DoCheck

Any time that change detection runs to determine whether the application need to be updated.

#### e. AfterContentInit

When any content children have fully initialized, this hook will allow uou to do any initial work necessary to finish setting up the content children components.

#### f. AfterContentChecked

Every time that Angular checks the content children, this can run so you can implement additional change detection logic.

#### g. AfterViewInit

This hook lets you run logic after all View Children have been initially rendered. This lets you know when the whole component tree has fully initialzed and can be manipulated.

#### h. AfterViewChecked

When Angular checks the component view and any View Children have been checked, you can implement additional logic to determine whether changes occurred.

## III. Nesting components

There are two ways to nest components:

- Any component that's nested inside another's template is called View Child. A View Child is declared inside the component template.
- A component accepts content to be inserted into its template is call Content Child:

```html
UserProfile component:

<user-avatar [avatar]="avatar"></user-avatar>
<ng-content></ng-content>
```

```html
When using UserProfile component

<user-profile [avatar]="user.avatar">
    <user-details [user]="user"></user-details>
</user-profile>
```

## IV. Types of components

### 1. App component

The root app component, and you only get one of these per application.

Recommended guidelines for App component:

- Keep it simple
- Use for application layout scaffolding
- Avoid loading data

### 2. Display component

A stateless component that reflects the values passed into it, making it highly reusable.

Recommended guidelines for Display component:

- Decouple
- Make it only as flexible as necessary
- Don't load data, accepts inputs only (need to verify inputs at runtime)
- Have a clean API
- Optionally use a service for configuration

### 3. Data component

A component that helps get data into application by loading it from external resources.

Recommended guidelines for Data component:

- Use appropriate lifecycle hooks
- Don't worry about reusability
- Set up display components
- Isolate business logic inside

### 4. Route component

When using the router, each route will render a component, and this makes the component intrinsically linked to the route.

Recommended guidelines for Route component:

- Template scaffolding for the route
- Load data or rely on data components
- Handles route parameters

## V. Content projection

Content projection allows us to declare the place to insert external content into our component.

We can use component selectors as `[app-nodes]` (contains table headers) and `app-nodes-row` (contains table colums for a single row):

```html
<table app-nodes class="table table-hover">
    <tr app-nodes-row *ngFor="let node of cluster1" [node]="node"></tr>
</table>
```

We can use multiple NgContent elements by adding an attribute that has a CSS to use for targeting.

```html
AppMetricComponent
<ng-content select="metric-title"></ng-content>
<ng-content select="metric-description"></ng-content>
...
```

```html
<app-metric [used]="cpuInfo">
    <metric-title>CPU Info</metric-title>
    <metric-description>Utilization of CPU cores</metric-description>
</app-metric>
<app-metric [used]="memoryInfo">
    <metric-title>Memory Info</metric-title>
    <metric-description>Utilization of Memory</metric-description>
</app-metric>
```
*Note: You need to add `schemas: [NO_ERRORS_SCHEMA]` to the module defination.
