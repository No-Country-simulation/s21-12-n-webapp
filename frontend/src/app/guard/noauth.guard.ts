import { CanActivateFn } from '@angular/router';

export const noauthGuard: CanActivateFn = (route, state) => {
  return true;
};
