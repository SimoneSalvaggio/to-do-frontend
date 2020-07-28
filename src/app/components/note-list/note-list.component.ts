import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Note } from 'src/app/model/Note';
import { TodoService } from 'src/app/services/todo.service';
import { Tag } from 'src/app/model/Tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notesArray: Note[];
  tagsArray: Tag[];

  constructor (
    private todoServices: TodoService,
    private tagService: TagService
    ) {}

  ngOnInit(): void {
    this.tagsArray = [];
    this.getTodosFromDb();
  }

  addNote(newNote: Note) {
    this.todoServices.addTodo(newNote).subscribe(
      (data) => {
        console.log(data);
      }
    );
    this.getTodosFromDb();
  }

  // onRemove(noteId: number) {
  //   for (let i = 0; i < this.notesArray.length; i++) {
  //     if (this.notesArray[i].id === noteId) {
  //       this.notesArray.splice(i, 1);
  //     }
  //   }
  // }

  removeSelected(event) {
    let elementTotal = this.notesArray.length;
    for (let i = 0; i < elementTotal; i++) {
      if (this.notesArray[i].selected) {
        this.notesArray.splice(i, 1);
        i--;
      }
    }
  }

  getTodosFromDb(){
    this.notesArray = [];
    let resp = this.todoServices.getAllTodos();
    resp.subscribe((dati) => {
      let todos = dati as Note[];
      for (let todo of todos){
        this.notesArray.push(todo)
      }
    })
  }

  getAllTags(){
    let resp = this.tagService.getAllTags();
    resp.subscribe((dati) => {
      let tags = dati as Tag[];
      console.log("tag che piglio dal db: " + tags)
      for (let tag of tags){
        this.tagsArray.push(tag)
      }
    })
  }

  onRemove(id){
    console.log("id che cerco di rimuovere: "+ id)
    this.todoServices.deleteTodo(id)
    this.getTodosFromDb();
  }

}
