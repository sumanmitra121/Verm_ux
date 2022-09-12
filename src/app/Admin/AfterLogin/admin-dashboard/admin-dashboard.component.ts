
import { Component, OnInit} from '@angular/core';
import {Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  incDetails:any= {
    Inc_name: "",
    brief_desc: "",
    dif_time: '',
    id: '',
    inc_dt: '',
    inc_name: "",
    inc_no: '',
    incident_type: "",
    initial_tier_id: '',
    lat: "",
    location: "",
    lon: "",
    offshore_name: "",
    tier_type: "",
    tot_casualty: ""
  };
  cur_inc_status:any ={
    visibility: '',
    temp_unit: '',
    sea_state: '',
    temp: '',
    wind_speed: '',
  };
  _show_incident_status_number:any = {
   closed_inc:'',
      opened_inc:'',
      approved_inc:'',
      tot_team:''
  }
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) {
    this.spinner.show();
    this.Actitve_incident();
  }
  showCardBody = true;
  arr:any=[];
  closed_incident:any;
   all_incident:any=[];
   inc_details:any=[];
   team_roster:any=[];
  opened_inc:any;
  approved_inc:any;
  get_current_incident:any[]=[];
  get_current_incident_status:any=[];
  inc_visibility:any='';
  _temp_unit:any = '';
  inc_sea_state:any='';
  inc_temparature:any='';
  wind_speed:any='';
  temp:any='';
  deg:any;
  inc_id:any;
  status_mode:any='2';
  statusType:any=[];
  get_active_emp:any=[];
  total_teams:any;
  panelOpenState = false;
  show_spinner: boolean = false;
  ngOnInit(): void {}

  get_incident_details(id:any){
    this.inc_id = id;
    this.getIncidentDetailsById(id);
  }
  getIncidentDetailsById(id:any){this.emergencyservice.global_service('0','/get_incident_dtls','id='+id).pipe(map((x:any) => x.msg)).subscribe(data=>{this.inc_details=data;})}
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
    this.show_spinner = true;
    setTimeout(() =>{
     this.status_mode=status_mode;
      var api_name = status_mode!='4' ? '/board_report' : '/prob_board_dashboard';
    var dt = status_mode!='4' ? 'inc_id='+this.incDetails?.id+'&board_id='+this.status_mode : 'inc_id='+this.incDetails?.id;
    this.emergencyservice.global_service('0',api_name,dt).pipe(map((x:any) => x.msg)).subscribe(data=>{

      this.show_spinner = false;
      this.statusType=data;
    })
    },500)

  }

  Actitve_incident(){
    this.emergencyservice.global_service('0','/get_active_inc',null).pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_current_incident=res;
      if(res.length > 0){
        this.setCurrentIncidentDetails(this.get_current_incident[this.get_current_incident.length -1]);
        this.spinner.hide();
      }
      else{
        this.get_opened_closed_archived_Incident();
        this.getTeamRoaster_data();
        this.getAllIncidents();
        this.spinner.hide();
      }
    })
  }
  setCurrentIncidentDetails(_res:any){
    this.incDetails = _res;
    this.incDetails.Inc_name = _res.inc_name+" ("+_res.inc_no +")";
    this.incDetails.location = _res.offshore_name+" ("+_res.lat+" : "+_res.lon+ ")";
    this.getCurrentIncidentStatus(_res.id);
    this.ActiveTeamMemberOfSelectedIncident();//need to change
    this.status_type(this.status_mode);
  }
  //Need_To_Change_This
  ActiveTeamMemberOfSelectedIncident(){
    this.emergencyservice.global_service('0','/active_emp_dashboard',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
      this.get_active_emp=data;})
  }
  //End
  getCurrentIncidentStatus(_id:any){
    this.emergencyservice.global_service('0','/inc_board','inc_id=' +_id).pipe(map((x:any)=>x.msg)).subscribe(res=>{this.cur_inc_status = res[0];})
  }
  get_opened_closed_archived_Incident(){
    this.emergencyservice.global_service('0','/inc_adm_dashboard',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
       this._show_incident_status_number.closed_inc= data.length > 0 ? data[0].closed_inc : 0;
       this._show_incident_status_number.opened_inc= data.length > 0 ? data[0].opened_inc : 0;
       this._show_incident_status_number.approved_inc=data.length > 0 ?  data[0].approved_inc : 0;
       this._show_incident_status_number.tot_team= data.length > 0 ? data[0].tot_team : 0;
  })
  }
  getAllIncidents(){
          this.emergencyservice.global_service('0','/get_all_incident',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
          this.all_incident=data;
          if(data.length>0){
          this.get_incident_details(data[0].id);
          }
          })
  }
  getTeamRoaster_data(){this.emergencyservice.global_service('0','/team_adm_dashboard',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
    this.team_roster=data;})
  }
}
