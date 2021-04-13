import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar-observables';
import { Note } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent  implements OnInit {
  public notes: Note[];
  public modeEditing: boolean;
  public currentNoteId: string | null;
  public currentNoteText: string;
  public noteAction: string;
  private updatesInProgress: string[];

  constructor(private dataService: NotesService, private slimLoadingBarService: SlimLoadingBarService) {
      this.notes = [];
      this.modeEditing = false;
      this.currentNoteId = null;
      this.currentNoteText = "";
      this.noteAction = "Create Note";
      this.updatesInProgress = new Array<string>();
  }

  ngOnInit() {
      this.dataService.getNotes()
          .subscribe(
              (data: Note[]) => this.notes = data,
              error => console.log(error)
          );
  }

  private getNote(noteId:String):Note  {
      return this.notes.filter(n => n.id === noteId)[0];
  }

  public edit(note: Note) {
      this.currentNoteId = note.id;
      this.currentNoteText = this.getNote(this.currentNoteId).text;
      this.modeEditing = true;
  }

  public createAction() {
      var noteText = this.currentNoteText;
      var note = { body: this.currentNoteText }
      // this._dataService.addNote(note)
      //     .subscribe(
      //         (createdNote: Note) => {
      //             this.notes.push(createdNote);
      //             this.currentNoteText = "";
      //         },
      //         error => console.log(error),
      //         () => this.slimLoadingBarService.complete()
      //     );
  }

  public updateAction() {
      var noteId = this.currentNoteId;
      // if (this._updatesInProgress.indexOf(noteId) > -1) return;
      // this._updatesInProgress.push(noteId);
      this.slimLoadingBarService.start();
      var currentNoteText = this.currentNoteText;

      // this._dataService.update(this.getNote(noteId), currentNoteText)
      //     .subscribe(
      //         (updateResult: Boolean) => {
      //             if (updateResult) {
      //                 this.getNote(noteId).body = currentNoteText.toString();
      //                 this._updatesInProgress.splice(this._updatesInProgress.indexOf(noteId), 1);
      //             } else {
      //                 Error();
      //             }
      //         },
      //         error => console.log(error),
      //         () => this.slimLoadingBarService.complete()
      //     );
  }

  public deleteAction(note: Note) {
      if (confirm("Are you sure you want to remove selected note?")) {
          // this._dataService.delete(note)
          //     .subscribe(
          //         (deleteResult: Boolean) => {
          //             if (deleteResult) {
          //                 this.notes.splice(this.notes.indexOf(note), 1);
          //             } else {
          //                 Error();
          //             }
          //         },
          //         error => console.log(error),
          //         () => this.slimLoadingBarService.complete()
          //     );
      }
  }

  public discardChanges() {
      this.modeEditing = false;
      this.currentNoteId = null;
      this.currentNoteText = "";
  }

  public isCreateDisabled() {
      return this.currentNoteText.length === 0;
  }

  public isUpdateDisabled() {
      return this.currentNoteId !== null && (
             this.currentNoteText === this.getNote(this.currentNoteId).text);// ||
             //this._updatesInProgress.indexOf(this.currentNoteId) > -1);
  }
}
