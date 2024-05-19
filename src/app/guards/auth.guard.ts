import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import { KeycloakService } from '../keycloak-config/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  if (tokenService.keycloak.isTokenExpired()) {
    router.navigate(['http://localhost:4200/#/login']);
    return false;
  }
  return true;
};