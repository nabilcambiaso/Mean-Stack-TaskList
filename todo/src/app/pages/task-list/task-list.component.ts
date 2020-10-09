import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../../task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
   lists:any[];
   tasks:any[];
  constructor(private taskService: TaskService,private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      console.log(params);
      this.taskService.getTask(params.listId).subscribe((task:any[])=>{
        this.tasks=task;
        console.log(task);
      })
    })

    this.taskService.getlist().subscribe((list: any[])=>{
      this.lists=list;
    })

  }




}
