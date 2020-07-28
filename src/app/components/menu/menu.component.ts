import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { TodoService } from 'src/app/services/todo.service';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/model/Tag';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() notesArray: [];
  @Input() tagsArray: Tag[];
  
  @Output() addNoteEmitter = new EventEmitter();
  @Output() removeSelectedEmit = new EventEmitter();
  
  nextCounter: number;
  newNote: Note;


  constructor(
    private tagService: TagService
    ) {

  }

  ngOnInit(): void {
    this.nextCounter = 1;
    this.newNote = new Note();
    this.getAllTags();
  }

  addNoteEvent() {
    this.newNote.selected = false;
    this.addNoteEmitter.emit(this.newNote)
    this.newNote = new Note();
  }

  removeSelectedEvent(event){
      this.removeSelectedEmit.emit(event);
  }

  getAllTags(){
    let resp = this.tagService.getAllTags();
    resp.subscribe((dati) => {
      let tags = dati as Tag[];
      for (let tag of tags){
        this.tagsArray.push(tag)
      }
    })

  }
  

}
