import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';

@Injectable({ providedIn: 'root' })
export class NotesService {

  private apiNotesUrl = 'http://localhost:9410/notes';  // URL to web api
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public getNotes() : Observable<Note[]> {
      return this.http.get<Note[]>(this.apiNotesUrl)
      .pipe(
        tap(obj => console.log('fetched notes '+obj)),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  // public create(noteText: String): Observable<Note> {
  //     return this.http
  //       .post(this.apiNotesUrl, JSON.stringify(noteText), { headers: this.headers })
  //       .pipe(map(response => response));
  // }

  // public update(note: Note, noteNewBody: String): Observable<Boolean> {
  //     return this.http.put(this.apiNotesUrl + '/' + note.id, JSON.stringify(noteNewBody), { headers: this.headers })
  //         .map(response => response.json());
  // }

  // public delete(note: Note): Observable<Boolean> {
  //     return this.http.delete(this.apiNotesUrl + '/' + note.id, { headers: this.headers })
  //         .map(response => response.json());
  // }

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
