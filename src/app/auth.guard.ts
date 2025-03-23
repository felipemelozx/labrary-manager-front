import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = localStorage.getItem('authToken');

    if (token) {
      return this.authService.isTokenValid(token).pipe(
        map(isValid => {
          console.log(isValid)
          if (isValid) {
            return true; // Token válido, permite acesso
          } else {
            this.logoutAndRedirect();
            return false; // Token inválido, bloqueia acesso
          }
        }),
        catchError(error => {
          console.error('Erro ao validar token:', error); // Para depuração
          this.logoutAndRedirect();
          return of(false); // Caso de erro, bloqueia acesso
        })
      );
    } else {
      this.logoutAndRedirect(); // Caso não tenha token, redireciona para login
      return of(false);
    }
  }

  private logoutAndRedirect() {
    localStorage.removeItem('token'); // Remove o token
    this.router.navigate(['/login']);  // Redireciona para a página de login
  }
}
