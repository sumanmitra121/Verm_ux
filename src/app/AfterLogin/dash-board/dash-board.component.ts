import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

declare var $:any;
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  headername:any='Dashboard';
  active_flag:any=localStorage.getItem('active_flag');
  icon:any='fa-tachometer';
  inc_visibility:any='';
  inc_sea_state:any='';
  inc_temparature:any='';
  wind_speed:any='';
  get_vessel_status:any=[];
  get_helicopter_status:any=[];
  get_casualty_status:any=[];
  get_evacuation_status:any=[];
  get_events_status:any=[];
  get_prob_status:any=[];
  from_ves:any;
  to_ves:any;
  ves_name:any;
  call_sign:any;
  from_heli:any;
  to_heli:any;
  teansport_mode:any;
  evacuation_time:any;
  event_resource:any;
  event_time:any;
  event_situation:any;
  inc_location:any;
  Inc_Name:any;
  global_inc:any=1;
  temp:any='';
  deg:any='';
  _observer!:Subscription;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrManager) {
   this._observer = this.emergencyservice.currentIncdents$.subscribe((res:any) => {
     localStorage.setItem('Inc_name',res.inc_name);
     localStorage.setItem('Inc_No',res.inc_no);
     localStorage.setItem('Inc_id',res.id);
     this.getIncStatus(res.id);
     this.getVesselStatus(res.id);
     this.getHelicopterStatus(res.id);
     this.getCasualtyStatus(res.id);
     this.getEvacuationStatus(res.id);
      this.getEventStatus(res.id);
      this.getProbStatus(res.id);
    })
  }
  ngOnInit(): void {this.emergencyservice.joinRoom({user:localStorage.getItem('Emp_name'),room:this.global_inc});}
  go_to_boards(v:any){localStorage.setItem('id_create',v);setTimeout(() => {this.router.navigate(['/Board']);}, 1000);}

getTooltipText(v:any,v1:any,v2:any,v3:any,v4:any,v5:any,mode:any){
  return  mode=='V' ? `Name :  ${v} (${v1})
          From-To:  ${v2} - ${v3}
          ETD-ETA:  ${v4} - ${v5}` : ( mode=='H' ? `Call Sign (Type) :  ${v} (${v1})
          From-To:  ${v2} - ${v3}
          ETD-ETA:  ${v4} - ${v5}` : ( mode=='C' ? `Full Name :  ${v}
          Employer:  ${v1}
          Condition:  ${v2}
          Time: ${v3}` : ( mode=='E' ? `Transportaion Mode : ${v}
          Time : ${v1}
          Pob Remaining : ${v2} ` :`Resource Assigned : ${v}
          Time : ${v1}
          Situation Status : ${v2}
          `)));
}
getIncStatus(_id:any){
  this.spinner.show('inc_status');
  this.emergencyservice.global_service('0','/inc_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
    if(res.length > 0){
      this.inc_visibility = res[0].visibility;
      this.inc_sea_state=res[0].sea_state;
      this.deg=res[0].temp.charAt(res[0].temp.length-1);
      this.temp=res[0].temp.split(this.deg)[0];
      this.wind_speed=res[0].wind_speed;
      }
      this.spinner.hide('inc_status');
  },error => {this.spinner.hide('inc_status');})


}
getVesselStatus(_id:any){
  this.spinner.show('vessel_stats');
  this.emergencyservice.global_service('0','/vessel_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
    this.get_vessel_status = res;
    this.spinner.hide('vessel_stats');
  },error => {this.spinner.hide('vessel_stats');})
}
getHelicopterStatus(_id:any){
  this.spinner.show('heli_stats');
  this.emergencyservice.global_service('0','/helicopter_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
    this.get_helicopter_status = res;
    this.spinner.hide('heli_stats');
  },error => {this.spinner.show('heli_stats');})
}
getCasualtyStatus(_id:any){
 //For Showing Casualty Status
      this.spinner.show('casualty_stats');
      this.emergencyservice.global_service('0','/casualty_board','inc_id=' +_id).pipe(map((x:any) => x.msg),take(2)).subscribe(res=>{
       this.get_casualty_status = res;
       this.spinner.hide('casualty_stats');
      },err =>{
        this.spinner.hide('casualty_stats');
      })
}
getEvacuationStatus(_id:any){
  this.spinner.show('evacuations');
  this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +_id).pipe(map((x:any) => x.msg),take(2)).subscribe(res=>{
    this.get_evacuation_status = res
    this.spinner.hide('evacuations');
  },err => {this.spinner.hide('evacuations');})
}
getEventStatus(_id:any){
      this.spinner.show('events');
      this.emergencyservice.global_service('0','/event_log_board','inc_id=' +_id).pipe(map((x:any) => x.msg),take(2)).subscribe(res=>{
        this.get_events_status=res;
         this.spinner.hide('events');
      },error=>{this.spinner.hide('events')})

}
getProbStatus(_id:any){
       this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_prob_status=res;
      })
}
ngOnDestroy(){
 this._observer.unsubscribe();
}

}
