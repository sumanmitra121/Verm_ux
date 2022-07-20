import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
   message_count:any=0;
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

    this.getIncidentDetails();
    this.checkStatus();
  }
  checkStatus(){
    this.emergencyservice.listen('user_status').pipe(map((x:any) => x.users)).subscribe(data=>{
            this._u_status.emit(data);
            if(data.find((x:userStatus) => x.employee_id == Number(localStorage.getItem('Employee_id')))?.user_status == 'O'){
                 this._header.logout();
            }
      })
  }
  getIncidentDetails(){
  // this.emergencyservice.global_service('0','/get_active_inc',null).pipe(map((x:any) => x.msg)).subscribe((data:any)=>{
  //    console.log(data.length);

  //   localStorage.setItem('Inc_name',data.length > 0 ? data[data.length -1].inc_name : '' );
  //   localStorage.setItem('Inc_No',data.length > 0 ? data[data.length -1].inc_no : '' );
  //   localStorage.setItem('Inc_id',data.length > 0 ?  data[data.length -1].id  : '');
  //   this._obser  = from(data).subscribe((res:any) =>{
  //              this.emergencyservice.setcurrInc(res);
  //             })


  // })
  }
  ngOnDestroy(): void {
    // this._obser.unsubscribe();
  }
}
