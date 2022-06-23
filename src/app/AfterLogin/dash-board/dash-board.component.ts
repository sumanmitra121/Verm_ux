import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
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
  get_incident_details:any=[];
  get_in_status:any=[];
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
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrManager) { }

  ngOnInit(): void {
 this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
      // console.log(data);
      this.get_incident_details=data;
      this.get_incident_details=this.get_incident_details.msg;
        if(this.get_incident_details!=''){
              this.Inc_Name= this.get_incident_details[0].inc_name+" ("+this.get_incident_details[0].inc_no +" )";
              this.inc_location=this.get_incident_details[0].offshore_name+" ("+this.get_incident_details[0].lat+" : "+this.get_incident_details[0].lon+ ")";
              localStorage.setItem('Inc_name',this.get_incident_details[0].inc_name);
              localStorage.setItem('Inc_No',this.get_incident_details[0].inc_no);
              localStorage.setItem('Inc_id',this.get_incident_details[0].id);
        }
        else{
          this.Inc_Name='';
          this.inc_location='';
          localStorage.setItem('Inc_name','');
          localStorage.setItem('Inc_No','');
          localStorage.setItem('Inc_id','');

        }
      this.spinner.show('inc_status');
      this.emergencyservice.global_service('0','/inc_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        // console.log(data);
        this.get_in_status=data;
        this.get_in_status=this.get_in_status.msg;

        if( this.get_in_status!=''){
          this.inc_visibility = this.get_in_status[0].visibility;
          this.inc_sea_state=this.get_in_status[0].sea_state;
         this.deg=this.get_in_status[0].temp.charAt(this.get_in_status[0].temp.length-1);
          this.temp=this.get_in_status[0].temp.split(this.deg)[0];
          this.wind_speed=this.get_in_status[0].wind_speed;
          
        }
         this.spinner.hide('inc_status');
      },error=>{
        // console.log(error);
        this.spinner.hide('inc_status');
      });
       this.spinner.show('vessel_stats');
        //For Showing Vessel Status
        this.emergencyservice.global_service('0','/vessel_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          // console.log(data);
          this.get_vessel_status.length=0;
          this.get_vessel_status=data;
          this.get_vessel_status=this.get_vessel_status.msg;
          // if(this.get_vessel_status!=''){
          //   this.ves_name= this.get_vessel_status[0].vessel_name;
          //   this.from_ves=this.get_vessel_status[0].form_at+"("+this.get_vessel_status[0].etd+")";
          //   this.to_ves=this.get_vessel_status[0].to_at+"("+this.get_vessel_status[0].eta+")";
          // }
           this.spinner.hide('vessel_stats')
          },error=>{this.spinner.hide('vessel_stats')})
        this.spinner.show('heli_stats');
      //Showing Helicopter Status
      this.emergencyservice.global_service('0','/helicopter_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        // console.log(data);
        this.get_helicopter_status.length=0;
        this.get_helicopter_status=data;
        this.get_helicopter_status=this.get_helicopter_status.msg;
        // if(this.get_helicopter_status!=''){
        //   this.call_sign=this.get_helicopter_status[0].heli_type+" ( "+this.get_helicopter_status[0].call_sign+" )";
        //   this.from_heli=this.get_helicopter_status[0].form_at+"("+this.get_helicopter_status[0].etd+")";
        //   this.to_heli=this.get_helicopter_status[0].to_at+"("+this.get_helicopter_status[0].eta+")";
        // }
      this.spinner.hide('heli_stats');
      },error=>{this.spinner.hide('heli_stats')})
      //For Showing Casualty Status
      this.spinner.show('casualty_stats');
      this.emergencyservice.global_service('0','/casualty_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        // console.log(data);
        this.get_casualty_status.length=0;
        this.get_casualty_status=data;
        this.get_casualty_status=this.get_casualty_status.msg;
        this.spinner.hide('casualty_stats');

      },error=>{this.spinner.hide('casualty_stats')})
      //For Evacuation Status
      this.spinner.show('evacuations');
      this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        this.get_evacuation_status.length=0;
        this.get_evacuation_status=data;
        this.get_evacuation_status=this.get_evacuation_status.msg;
        // if(this.get_evacuation_status!=''){
        //   this.teansport_mode= this.get_evacuation_status[0].mode_of_transport;
        //   this.evacuation_time=this.get_evacuation_status[0].time;
        // }
       this.spinner.hide('evacuations');
      },error=>{this.spinner.hide('evacuations')})
      //For Eventslog Status
      this.spinner.show('events');
      this.emergencyservice.global_service('0','/event_log_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
         this.get_events_status=data;
         this.get_events_status=this.get_events_status.msg;
        //  if(this.get_events_status!=''){
        //   this.event_resource=this.get_events_status[0].resource_assigned;
        //   this.event_time= this.get_events_status[0].time;
        //   this.event_situation=this.get_events_status[0].situation_status;
        //  }
         this.spinner.hide('events');
      },error=>{this.spinner.hide('events')})

      this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
      this.get_prob_status=data;
      this.get_prob_status=this.get_prob_status.msg;
      })
  })
    this.emergencyservice.joinRoom({user:localStorage.getItem('Emp_name'),room:this.global_inc});
  }
go_to_boards(v:any){localStorage.setItem('id_create',v);setTimeout(() => {this.router.navigate(['/Board']);}, 1000);}
clearCoor(){$('.carousel').carousel({interval: false,});}

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
// select_mode(inc_no:any){
//   console.log(inc_no);
//    if(confirm('Are you sure you want to change incident?')){
//           this.router.navigate([]).then((result) => {
//             localStorage.removeItem('Inc_No');
//             localStorage.removeItem('Inc_id');
//               localStorage.setItem('Inc_id','1')
//             localStorage.setItem('Inc_No','20221');
//             window.open('http://localhost:4200/#/dashboard', '_blank'); 
//         });
//         }
//    else{


//    }
// }
}
