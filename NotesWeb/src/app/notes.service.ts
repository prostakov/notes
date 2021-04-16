import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private apiUrl: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL;
  }

  public getNotes() : Observable<Note[]> {
      return this.http.get<Note[]>(this.apiUrl)
        .pipe(
          tap(obj => console.log('fetched notes '+obj)),
          catchError(this.handleError<Note[]>('getNotes', []))
        );
  }

  public createOrUpdate(note: Note): Observable<Note> {
      return this.http.put<Note>(this.apiUrl, JSON.stringify(note), { headers: this.headers })
        .pipe(
          catchError(this.handleError('createOrUpdateNote', note))
        );
  }

  public delete(note: Note) {
      return this.http.delete(this.apiUrl + '/' + note.id, { headers: this.headers });
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** Log a NoteService message with the MessageService */
    private log(message: string) {
      console.log(`NoteService: ${message}`);
    }
}
