import { Component, OnInit } from '@angular/core';
import { IncDetails } from 'src/app/Model/IncDetails';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
   message_count:any=0;
   badge:any;
   _inc_details:IncDetails[] =[];
  constructor(private emergencyservice:VirtualEmergencyService) { }

  ngOnInit(): void {
    if(localStorage.getItem('router')!='/livelog'){
      if('message_come' in localStorage){this.message_count=localStorage.getItem('message_come');}
      else{this.message_count=0;}
     }
    else{this.message_count=0;}
   
    //For getting instant messages sent by other users without refresh the page
    this.emergencyservice.listen('message').subscribe(data => {
      if(localStorage.getItem('router')!='/livelog'){
      this.message_count++;
      console.log("after:",this.message_count);
      }
      else{
        this.message_count=0;
      }
      localStorage.setItem('message_come',this.message_count);
    })  
    
    this.getIncidentDetails()
  }
  getIncidentDetails(){
  // this.emergencyservice.global_service('0','/get_active_inc',null).subscribe((data:any)=>{
  //         //  this._inc_details = data;
  //         this.emergencyservice.setcurrInc(data);

      
  // })
  }

}
