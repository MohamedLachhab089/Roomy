import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../token/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isTokenNotValid()) {
    router.navigate(['']);
    return false;
  }

  const requiredRole = route.data?.['role'];
  const userRole = tokenService.getRole();

  if (requiredRole && userRole !== requiredRole) {
    router.navigate(['']);
    return false;
  }

  return true;
};
