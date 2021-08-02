import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({  providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
  private router: Router) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
 /* if (localStorage.getItem('currentUser')) {
    // logged in so return true
    return true;
}

// not logged in so redirect to login page with the return url
this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
return false;*/
  var result = this.checkLoggedIn(state.url);
  console.log('canActivate: ' + result + ',state.url' + state.url);
  return result;
}

canLoad(route: Route): boolean {
  if(route!=null){
    return this.checkLoggedIn(route.path!=null ? route.path : '/');
  }
  return false;
}

checkLoggedIn(url: string): boolean {
  if (this.authService.isAuthenticated()) {
          return true;
      }
      this.router.navigate(['/login']);
      return false;
}
}
