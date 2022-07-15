import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { from, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncDetails } from 'src/app/Model/IncDetails';
import { userDtls } from 'src/app/Model/userDtls';
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
  @Output() _users = new EventEmitter<userDtls[]>();
   message_count:any=0;
   badge:any;
   _inc_details:IncDetails[] =[];
   _obser!:Subscription;
  constructor(private emergencyservice:VirtualEmergencyService,public router:ActivatedRoute,private _header:HeaderComponent) {}


  ngOnInit(): void {
    this.holdMessageCount()
    //For getting instant messages sent by other users without refresh the page
    this.emergencyservice.listen('message').subscribe(data => {
      // Old//
      // if(localStorage.getItem('router')!='/livelog'){
      // this.message_count++;
      // }
      // else{
      //   this.message_count=0;
      // }
      // localStorage.setItem('message_come',this.message_count);

      //Old End//
      // New//
      if(this.router.snapshot?.routeConfig?.path != 'livelog'){
        this.message_count++;
      }
      else{
        this.message_count = 0;
      }
      localStorage.setItem('_msg_come',this.message_count);
      //New End
    })

    this.getIncidentDetails()
    this.getMyStatus()
  }
  getMyStatus(){
    this.emergencyservice.listen('user_status').pipe(map((x:any) => x.users)).subscribe((data:any)=>{
      this._users.emit(data);
      if(data.find((u:userDtls) => u.employee_id  == Number(localStorage.getItem('Employee_id')))?.user_status == 'O'){
          this._header.logout();
      }

    })
  }
  holdMessageCount(){
   if(this.router.snapshot?.routeConfig?.path != 'livelog'){
      if('message_come' in localStorage){
        this.message_count=localStorage.getItem('message_come');}
     }
  }
  getIncidentDetails(){
  this.emergencyservice.global_service('0','/get_active_inc',null).pipe(map((x:any) => x.msg)).subscribe((data:any)=>{
          this._obser  = from(data).subscribe((res:any) =>{
            this.emergencyservice.setcurrInc(res);
            localStorage.setItem('Inc_name',res.inc_name);
            localStorage.setItem('Inc_No',res.inc_no);
            localStorage.setItem('Inc_id',res.id);
          })


  })
  }
  ngOnDestroy(): void {
    this._obser.unsubscribe();
  }
}
