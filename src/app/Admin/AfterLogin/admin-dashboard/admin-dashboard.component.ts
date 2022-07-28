import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import {Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
    animations: [
        trigger('openClose', [
            state('open', style({
                height: '*',
                opacity: 1,
            })),
            state('closed', style({
                height: '0',
                opacity: 0
            })),
            transition('open => closed', [
                animate('0.35s')
            ]),
            transition('closed => open', [
                animate('0.35s')
            ]),
        ]),
    ]
})
export class AdminDashboardComponent implements OnInit {

  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }
  showCardBody = true;
  arr:any=[];
  closed_incident:any;
   all_incident:any=[];
   inc_details:any=[];
   team_roster:any=[];
  opened_inc:any;
  approved_inc:any;
  get_current_incident:any=[];
  get_current_incident_status:any=[];
  inc_visibility:any='';
  _temp_unit:any = '';
  inc_sea_state:any='';
  inc_temparature:any='';
  wind_speed:any='';
  temp:any='';
  deg:any;
  Inc_Name:any='';
  Inc_location:any='';
  tier:any='';
  hours:any='';
  Inc_type:any='';
  inc_id:any;
  status_mode:any='2';
  statusType:any=[];
  get_active_emp:any=[];
  tot_casualty:any;
  total_teams:any;
  ngOnInit(): void {
    this.spinner.show();
    // For Getting Current Incident
    this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
      this.get_current_incident=data;
      this.get_current_incident=this.get_current_incident.msg;
      if(this.get_current_incident.length > 0){
      this.Inc_Name= this.get_current_incident[0].inc_name+" ("+this.get_current_incident[0].inc_no +")";
      this.Inc_location=this.get_current_incident[0].offshore_name+" ("+this.get_current_incident[0].lat+" : "+this.get_current_incident[0].lon+ ")";
      this.tier=this.get_current_incident[0].tier_type;
      this.hours=this.get_current_incident[0].dif_time;
      this.Inc_type=this.get_current_incident[0].incident_type;
      this.inc_id=this.get_current_incident[0].id;
      this.tot_casualty=this.get_current_incident[0].tot_casualty;

      // For gettting Current Incident  Status
      this.emergencyservice.global_service('0','/inc_board','inc_id=' +this.get_current_incident[0].id).subscribe(data=>{
        console.log(data);
        this.get_current_incident_status=data;
        this.get_current_incident_status=this.get_current_incident_status.msg;
        if(this.get_current_incident_status!=''){
          this.inc_visibility = this.get_current_incident_status[0].visibility;
          this.inc_sea_state=this.get_current_incident_status[0].sea_state;
        //  this.deg=this.get_current_incident_status[0].temp.charAt(this.get_current_incident_status[0].temp.length-1);
          this.temp=this.get_current_incident_status[0].temp;
          this.wind_speed=this.get_current_incident_status[0].wind_speed;
          this._temp_unit = this.get_current_incident_status[0].temp_unit;
        }


      })
      this.emergencyservice.global_service('0','/active_emp_dashboard',null).subscribe(data=>{
       this.get_active_emp=data;
      this.get_active_emp=this.get_active_emp.msg;
      })
      this.status_type(this.status_mode);
      // this.spinner.hide();
      }
      else{
          // For getting closed,Opened & approved incident
          this.emergencyservice.global_service('0','/inc_adm_dashboard',null).subscribe(data=>{
            this.arr=data;
            this.closed_incident=this.arr.msg[0].closed_inc;
            this.opened_inc=this.arr.msg[0].opened_inc;
            this.approved_inc=this.arr.msg[0].approved_inc;
            this.total_teams=this.arr.msg[0].tot_team;

          })
          // For  getting all incidents
          this.emergencyservice.global_service('0','/get_all_incident',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
          this.all_incident=data;
          // this.all_incident=this.all_incident.msg;
          if(this.all_incident.length>0){
          this.get_incident_details(this.all_incident[0].id,0);
          }
          })
          // For getting team on Roster data
          this.emergencyservice.global_service('0','/team_adm_dashboard',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
            console.log(data);
            this.team_roster=data;
            // this.team_roster=this.team_roster.msg;
            // if(this.team_roster.length>0){
            //   $('#team_Roster').html(this.team_roster[0].team_name + '  <small><i>'+this.team_roster[0].team_type+ '  From:' + this.team_roster[0].from_date +' To:' +this.team_roster[0].to_date +'</small></i>')
            // }
          })
        this.spinner.hide();
      }
      })
  }
  expandDiv(){this.showCardBody = !this.showCardBody;}

  get_incident_details(id:any,index:any){
    for(let i=0;i<this.all_incident.length;i++){
      var element = document.getElementById("active_"+i);
      element?.classList.remove("active");
    }
    var element = document.getElementById("active_"+index);
    element?.classList.add("active");
    this.emergencyservice.global_service('0','/get_incident_dtls','id='+id).subscribe(data=>{
      // console.log(data);
       this.inc_details=data;
       this.inc_details=this.inc_details.msg;
    })

  }
  ngAfterViewInit() {
  //  For Pie Chart
    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];
    var myChart = new Chart("ctx", {
      type: "pie",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
      }
    });
  }
  status_type(status_mode:any){
    this.status_mode=status_mode;
    this.statusType.length=0;
    if(status_mode!='4'){
    this.emergencyservice.global_service('0','/board_report','inc_id='+this.inc_id+'&board_id='+this.status_mode).subscribe(data=>{
      console.log(data);
      this.statusType=data;
      this.statusType=this.statusType.msg;
    })
   }
   else{
    this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +this.inc_id).subscribe(data=>{
     console.log(data);
     this.statusType=data;
     this.statusType=this.statusType.msg;
    })
   }
   this.spinner.hide();
  }

}
