import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { from, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IncDetails } from 'src/app/Model/IncDetails';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

declare var $:any;
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  _temp_unit:any;
  _casualty_observeable!:Subscription;
  _evacuation_observeable!:Subscription;
  _event_observable!:Subscription;

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
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrManager) {}
  ngOnInit(): void {this.emergencyservice.joinRoom({user:localStorage.getItem('Emp_name'),room:this.global_inc,emp_code:localStorage.getItem('Employee_id')});}
  go_to_boards(v:any){localStorage.setItem('id_create',v); this.router.navigate(['/Board']);}

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
  console.log(_id);

  this.emergencyservice.global_service('0','/inc_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
    console.log(res);


      this.inc_visibility = res.length > 0 ? res[0].visibility : '';
      this.inc_sea_state=res.length > 0 ? res[0].sea_state : "";
      // this.deg=res.length > 0 ? res[0].temp.charAt(res[0].temp.length-1): '';
      this.temp=res.length > 0 ? res[0].temp : '';
      this.wind_speed=res.length > 0 ? res[0].wind_speed : '';
      this.spinner.hide('inc_status');
      this._temp_unit = res.length > 0 ?  res[0].temp_unit : '';
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
    this.get_casualty_status.length=0;

        this._casualty_observeable =  from(res).pipe(take(2)).subscribe(dt =>{
        this.get_casualty_status.push(dt)
       })
       this.spinner.hide('casualty_stats');
      },err =>{
        this.spinner.hide('casualty_stats');
      })
}
getEvacuationStatus(_id:any){
  this.spinner.show('evacuations');
  this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
    //.log(res);
    this.get_evacuation_status.length = 0;

    this._evacuation_observeable =  from(res).pipe(take(2)).subscribe(dt =>{
      //.log(dt)
    this.get_evacuation_status.push(dt)
     //.log(this.get_evacuation_status)

     })
    this.spinner.hide('evacuations');
  },err => {this.spinner.hide('evacuations');})
}
getEventStatus(_id:any){
      this.spinner.show('events');
      this.get_events_status.length=0;
      this.emergencyservice.global_service('0','/event_log_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_events_status.length=0;

        this._event_observable = from(res).pipe(take(2)).subscribe(dt =>{
        this.get_events_status.push(dt);
      })
         this.spinner.hide('events');
      },error=>{this.spinner.hide('events')})

}
getProbStatus(_id:any){
       this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_prob_status=res;
      })
}

getIncDetails(e:IncDetails){

    this.getIncStatus(e.id);
    this.getVesselStatus(e.id);
    this.getHelicopterStatus(e.id);
    this.getCasualtyStatus(e.id);
    this.getEvacuationStatus(e.id);
     this.getEventStatus(e.id);
     this.getProbStatus(e.id);
}

}
