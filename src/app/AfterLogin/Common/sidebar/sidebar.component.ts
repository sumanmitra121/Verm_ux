import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Subscription} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IncDetails } from 'src/app/Model/IncDetails';
import { userStatus } from 'src/app/Model/userStatus';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { HeaderComponent } from '../header/header.component';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[HeaderComponent]

})
export class SidebarComponent implements OnInit,OnDestroy {
  @Output() _u_status = new EventEmitter<userStatus>();
  incArr:any=[];
   message_count:any=0;
   _notification:any=[];
   badge:any;
   _inc_details:IncDetails[] =[];
   _obser!:Subscription;
  constructor(private emergencyservice:VirtualEmergencyService,private _header:HeaderComponent,private route:ActivatedRoute) { }
  ngOnInit(): void {
    // if(localStorage.getItem('router')!='/livelog'){
      if(this.route?.snapshot?.routeConfig?.path != 'livelog'){
      if('message_come' in localStorage){this.message_count=localStorage.getItem('message_come');}
        else{this.message_count=0;}
       }
      else{this.message_count=0;}

    //For getting instant messages sent by other users without refresh the page
    this.emergencyservice.listen('message').subscribe(data => {
        if(this.route?.snapshot?.routeConfig?.path != 'livelog'){
          this.message_count++;
         }
      localStorage.setItem('message_come',this.message_count);
    })

    this.checkStatus();
  }
  checkStatus(){
    this.emergencyservice.listen('user_status').pipe(map((x:any) => x.users)).subscribe(data=>{
            // console.log(data)
            this._u_status.emit(data);
            if(data.find((x:userStatus) => x.employee_id == Number(localStorage.getItem('Employee_id')))?.user_status == 'O'){
                 this._header.logout();
            }
      })
  }

  ngOnDestroy(): void {
    // this._obser.unsubscribe();
  }
}
