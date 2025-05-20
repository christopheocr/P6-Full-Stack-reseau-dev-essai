import { CanActivateFn } from '@angular/router';
import {  Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const token = localStorage.getItem('token');
  const router = inject(Router);

  if (!token) {
    // On redirige après que le guard ait terminé (évite page blanche)
    setTimeout(() => router.navigate(['/login']), 0);
    return false;
  }

  return true;
};
