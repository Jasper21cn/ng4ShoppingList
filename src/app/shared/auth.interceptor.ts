import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    // Here 'req' is immutable so must make a copy for editing purpose
    // Clone() method can be configured for editing 'req'
    // append() method for adding additional data, and set for overwriting data
    // const copiedReq = req.clone({headers: req.headers.append('', '')});
    return this.store.select('auth')
      .take(1)
      .switchMap(
        (authState: fromAuth.State) => {
          const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
          return next.handle(copiedReq);
        }
    );
  }
}
