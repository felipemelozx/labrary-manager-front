import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interface/Book';
import { catchError, Observable, of } from 'rxjs';
import { BookCreateDTO } from '../interface/BookCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private apiUrl = "api/v1/book";

  getAllBooks(): Observable<Book[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Book[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError<Book[]>('getAllBooks', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  createBook(book: BookCreateDTO): Observable<Book> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Book>(`${this.apiUrl}/create`, book, { headers }).pipe(
      catchError(this.handleError<Book>('createBook'))
    );
  }
}
