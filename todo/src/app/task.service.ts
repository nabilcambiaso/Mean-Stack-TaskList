import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService:WebRequestService) { }



   getlist()
   {
     return this.webReqService.get('lists');
   }


   createList(title:string){
    //send a web request to create a list
   return this.webReqService.post('lists',{title});
 }

   getTask(id:any)
   {
     return this.webReqService.get(`lists/${id}/tasks`);
   }

   createTask(title:string,listId:string){
    //send a web request to create a list
   return this.webReqService.post(`lists/${listId}/tasks`,{title});
 }







}
