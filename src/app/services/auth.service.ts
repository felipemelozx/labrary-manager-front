import { RegisterDTO } from './../interface/registerDTO';
import { loginDTO } from './../interface/loginDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../interface/LoginResponse';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  private apiUrl = "api/v1/auth/";

  login(loginDTO: loginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + "login", loginDTO);
  }

  register(registerDTO: RegisterDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + "register", registerDTO);
  }
}
