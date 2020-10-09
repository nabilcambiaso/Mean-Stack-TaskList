import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService,private route:ActivatedRoute, private routes:Router) { }
  listId:string;


  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.listId=params.listId;
    })
  }


  addNewTask(title:string)
  {
    this.taskService.createTask(title,this.listId).subscribe((task:Task)=>{
      this.routes.navigate([`/lists/${this.listId}`]);
    });
  }



}
