import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  {path:'',redirectTo:'lists',pathMatch:'full'},
  {path:'NewList',component:NewListComponent},
  {path:'lists/:listId',component:TaskListComponent},
  {path:'lists',component:TaskListComponent},
  {path:'lists/:listId/NewTask',component:NewTaskComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
