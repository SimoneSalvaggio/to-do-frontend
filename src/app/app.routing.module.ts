import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NoteListComponent } from './components/note-list/note-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: NoteListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
