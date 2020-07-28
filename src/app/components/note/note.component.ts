import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { Tag } from 'src/app/model/Tag';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Input() tagsArray: Tag[];

  @Output() onRemoveEvent = new EventEmitter();
  
  tagName: string;

  constructor(private todoServices: TodoService) {}

  ngOnInit() {
    this.getTagNameFromNote();
  }

  remove(){
    this.onRemoveEvent.emit(this.note.id)
  }

  setSelected(){
    this.note.selected = !this.note.selected;
  }

  getTagNameFromNote(){
    for (let tag of this.tagsArray)
    if (tag.id == this.note.tagId){
      this.tagName = tag.description;
    }
  }

}
