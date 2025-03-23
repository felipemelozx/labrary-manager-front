import { RegisterDTO } from './../interface/registerDTO';
import { loginDTO } from './../interface/loginDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interface/LoginResponse';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  private apiUrl = "api/v1/auth/";

  login(loginDTO: loginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, loginDTO);
  }

  register(registerDTO: RegisterDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}register`, registerDTO);
  }

  isTokenValid(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate-token`, { token }).pipe(
      map(response => response.valid), // Retorna diretamente o valor do booleano 'valid'
      catchError(error => {
        const isForbidden = error.status === 403;
        if (isForbidden) {
          console.warn('Token inválido ou expirado.');
        } else {
          console.error('Erro ao validar o token:', error);
        }
        return of(false); // Retorna false em caso de erro
      })
    );
  }
  
}
