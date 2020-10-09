import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from '../../models/list.model';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService,private route:Router) { }

  ngOnInit(): void {
  }


  addNewList(title:string)
  {
      this.taskService.createList(title).subscribe((list:List)=>{
        this.route.navigate(['/lists',list._id]);
      })
  }

}
