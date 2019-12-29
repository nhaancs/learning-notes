# Http

## I. Handle Errors

- When a request failed, Angular result an `Error Response`, aka `Response`
- Handle error response in services
- `ErrorHandler` is a built in of Angular (for global error handler)
- Write AppError implement `ErrorHandler` for general app errors, NotFoundError, BadInput, ... for not found error. You may need to catch the original error got from the server
- Register error handlers with Angular `{provide: ErrorHandler, useClass: AppError}`
- Can set errors backs to form (optional)
=>  Handle errors and error alerts in all app

## II. Observable

- In `Observable`, nothing happen until the subscribe method is called => different with `Promise`
- Subscribe to multiple observables: `combineLatest`
- `switchMap`
- http dont need unsubscribe, but firebase need (or use async pipe instead)
