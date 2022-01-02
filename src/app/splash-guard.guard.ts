import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ValidateTokenGQL} from '../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class SplashGuard implements CanActivate {
  constructor(
    private router: Router,
    private validateToken: ValidateTokenGQL,
  ) {
  }
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('gracie-gql-token');
    if (token) {
      return this.validateToken
          .fetch({token})
          .toPromise()
          .then((result) => {
            if (result.data.validateToken) {
              return this.router.navigate(['/home']);
            } else {
              localStorage.removeItem('gracie-gql-token');
              return true;
            }
          });
    }
    return true;
  }
}
