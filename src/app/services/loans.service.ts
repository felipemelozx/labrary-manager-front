import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LoansCreateDTO } from '../interface/LoansCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http: HttpClient) { }

  private apiUrl = "api/v1/loans";

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  findAllLoans(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}`, { headers }).pipe();
  }
  createLoans(loansCreateDTO: LoansCreateDTO): Observable<LoansCreateDTO> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<LoansCreateDTO>(`${this.apiUrl}/create`, loansCreateDTO, { headers }).pipe(
      catchError(this.handleError<any>('createBook'))
    );
  }
  updateLoans(loansID: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/${loansID}`, {}, { headers }).pipe(
      catchError(this.handleError<any>('updateLoans'))
    );
  }

}

