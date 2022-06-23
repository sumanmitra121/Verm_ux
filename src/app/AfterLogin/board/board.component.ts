import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import {NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
// import { saveAs } from 'file-saver';
declare var $:any;
export class DynamicGrid{
  time_inc:any;
  visibility:any;
  sea_state:any;
  temp:any;
  wind_speed:any;
  wind_direc:any
}
export class vesselGrid{
  call_sign:any;
  vessel_name:any;
  vessel_type:any;
  form_at:any;
  etd:any;
  to_at:any;
  eta:any;
  remarks:any;
  heli_type:any;
  full_name:any;
  employer:any;
  condition:any;
  location:any;
  time:any
  situation_status:any;
  resource_assigned:any;
  destination:any;
  mode_of_transport:any;
  pob_remaining:any;

  date:any;
  prob_cat_id:any;
  Time:any;
  value:any
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


resource_assigned:any;
event_time:any;
situation_status:any;
 vessel_stats:any;
 ves_name:any;
 form_at:any;
 to_at:any;
 call_sign:any;
 hel_to:any;
 hel_from:any;
 //For the spinner
 event_logs:boolean=true;
@ViewChild('logForm') LogForm!:NgForm;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
inc_visibility:any='';
inc_sea_state:any='';
inc_temparature:any='';
wind_speed:any='';
displayedColumns: string[] = [];
dataSource= new MatTableDataSource();
default_user:any=localStorage.getItem('Email');
  public now: Date = new Date();
  get_incident_details:any=[];
  employee_list:any=[];
  offshore_list: any=[];
  get_in_status:any=[];//For Showing status of Latest Incident;
  get_vessel_status:any=[];//For Showing  status of Vessel Status
  get_casualty_status:any=[];
  get_helicopter_status:any=[];
  get_evacuation_status:any=[];
  get_prob_status:any=[];
  get_events_status:any=[];
  get_incident_details_after_save:any=[];
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  vesselArray: Array<vesselGrid>=[];
  get_pob_category:any=[];
  vesselDynamic:any={};
  headername:any='Boards';
  icon:any='fa-users'
  id_create:any='inc_create';
  Inc_name:any;
  Inc_id:any;
  y:any;
  inc_name:any;
  Inc_No:any;
  Inc_location:any;
  check_respond:any;
  total:any;
  Full_name:any;
  lat:any;
  long:any;
  Location:any;
  transport_mode:any;
  evacuation_time:any;
  deg:any;
  temp:any;

  total_value:any;
  category_name:any;
  // prob_date:any;
  prob_time:any;
  mode:any;
  constructor(private datePipe:DatePipe,private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private spinner:NgxSpinnerService) { setInterval(() => {
    this.now = new Date();
    $('#Time').val(this.datePipe.transform(this.now,'hh:mma'));
  }, 1); }

  ngOnInit(): void {
    //after clicking on particular board item from dashboard,route on this page and open the particular modal of clicked item.
    if('id_create' in localStorage){
      this.id_create=localStorage.getItem('id_create');
      var modal='#'+this.id_create
      $(modal).click();
      localStorage.removeItem('id_create')
    }
    ////////////////End///////////////////

    this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
      this.get_incident_details=data;
      this.get_incident_details=this.get_incident_details.msg;
      if(this.get_incident_details!=''){
      this.Inc_name=this.get_incident_details[0].inc_name;
      this.Inc_id=this.get_incident_details[0].inc_no;
      this.inc_name=this.get_incident_details[0].inc_name+" ("+this.get_incident_details[0].inc_no +" )";
      this.Inc_location=this.get_incident_details[0].offshore_name+" ("+this.get_incident_details[0].lat+" : "+this.get_incident_details[0].lon+ ")";
      //For Showing Incident Status
      this.emergencyservice.global_service('0','/inc_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        this.get_in_status=data;
        this.get_in_status=this.get_in_status.msg;
        if( this.get_in_status!=''){
          this.inc_visibility = this.get_in_status[0].visibility;
          this.inc_sea_state=this.get_in_status[0].sea_state;
          this.inc_temparature=this.get_in_status[0].temp;
          this.deg=this.get_in_status[0].temp.charAt(this.get_in_status[0].temp.length-1);
          this.temp=this.get_in_status[0].temp.split(this.deg)[0];
          this.wind_speed=this.get_in_status[0].wind_speed;
        }
      })
        //For Showing Vessel Status
        this.emergencyservice.global_service('0','/vessel_board','inc_id=' + this.get_incident_details[0].id).subscribe(data=>{
          this.get_vessel_status.length=0;
          this.get_vessel_status=data;
          this.get_vessel_status=this.get_vessel_status.msg;
          if(this.get_vessel_status!=''){
            this.display_vessel_status(0,this.get_vessel_status);//For Iterating vessel Status
          }
          else{

          }
        })
        //Showing Helicopter Status
        this.emergencyservice.global_service('0','/helicopter_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          this.get_helicopter_status.length=0;
          this.get_helicopter_status=data;
          this.get_helicopter_status=this.get_helicopter_status.msg;
          if(this.get_helicopter_status!=''){
            this.display_helicopter_status(0,this.get_helicopter_status);
          }
          else{
          }
        })
        //For Showing Casualty Status
        this.emergencyservice.global_service('0','/casualty','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          ;
          this.get_casualty_status.length=0;
          this.get_casualty_status=data;
          this.get_casualty_status=this.get_casualty_status.msg;
          if(this.get_casualty_status!=''){
          this.display_casualty_status(0,this.get_casualty_status);//For Iterating Casualty Status
          }
          else{

          }
        })
        //For Evacuation Status
        this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          // this.spinner.show('evacuation');
          this.get_evacuation_status.length=0;
          this.get_evacuation_status=data;
          this.get_evacuation_status=this.get_evacuation_status.msg;
          if(this.get_evacuation_status!=''){
            this.display_evacuation_status(0,this.get_evacuation_status);//For Iterating Casualty Status
          }
          else{
            // this.spinner.hide('evacuation');
          }
        })
        //For Eventslog Status
        this.emergencyservice.global_service('0','/event_log_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          // this.spinner.show('events');
          // this.event_logs=false;
          this.get_events_status=data;
          this.get_events_status=this.get_events_status.msg;
          if( this.get_events_status!=''){
            this.display_events_status(0,this.get_events_status);
          }
          else{
            // this.spinner.hide('events');
            // this.event_logs=true;
          }
        })
        // For Pob Status
        this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          this.spinner.show("pob");
          this.get_prob_status.length=0;
          this.get_prob_status=data;
          this.get_prob_status=this.get_prob_status.msg;
          this.spinner.hide("pob");
        })
      }
      else{
        // localStorage.setItem('Inc_name',''),
        // localStorage.setItem('Inc_No',''),
        // localStorage.setItem('Inc_id','')
      }
    })

  }
  submit(v:Form){
    var counter=0;
    this.check_respond='';
      if(this.id_create=='inc_create'){
        for(let i=0;i<this.dynamicArray.length;i++){
          if(this.dynamicArray[i].time_inc=='' || this.dynamicArray[i].visibility=='' || this.dynamicArray[i].sea_state=='' || this.dynamicArray[i].temp=='' || this.dynamicArray[i].wind_speed=='' || this.dynamicArray[i].wind_direc==''){}
          else{counter++;}
        }
        if(counter==this.dynamicArray.length){
          var dt={
            "inc_id": localStorage.getItem('Inc_id'),
            "installation":this.LogForm.form.value.installation,
            "coordinates":this.LogForm.form.value.coordinates,
            "summary":this.LogForm.form.value.summary,
            "status":this.LogForm.form.value.status,
            "user":this.default_user,
              "dt":this.dynamicArray
          }
          this.emergencyservice.global_service('1','/inc_board',dt).subscribe(data=>{
          this.check_respond=data;
            if(this.check_respond.suc==1){
              if(this.get_incident_details_after_save.length==this.dynamicArray.length){this.mode='updated incident board';}
                  else{this.mode='added incident board';}
                 var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BI',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
                 // For Notification
                this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{
                }) 
                  // For Getting Incident board
                  this.emergencyservice.global_service('0','/inc_board','inc_id=' +localStorage.getItem('Inc_id')).subscribe(data=>{
                    this.get_in_status=data;
                    this.get_incident_details_after_save= this.get_in_status.msg;
                      this.inc_visibility = this.get_in_status.msg[0].visibility;
                      this.inc_sea_state=this.get_in_status.msg[0].sea_state;
                      this.inc_temparature=this.get_in_status.msg[0].temp;
                      this.wind_speed=this.get_in_status.msg[0].wind_speed;
                      this.deg=this.get_in_status.msg[0].temp.charAt(this.get_in_status.msg[0].temp.length-1);
                      this.temp=this.get_in_status.msg[0].temp.split(this.deg)[0];  
                  })
                  this.myFunction();

             }
             else{
                this.toastr.errorToastr('Failed to submit','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
             }
            },error=>{
                this.toastr.errorToastr('Something Went Wrong,Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
          })
         }
        else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }
      else if(this.id_create=='vessel_create'){
        for(let i=0;i<this.vesselArray.length;i++){
          if(this.vesselArray[i].vessel_name=='' || this.vesselArray[i].vessel_type=='' || this.vesselArray[i].form_at=='' || this.vesselArray[i].etd=='' || this.vesselArray[i].to_at=='' || this.vesselArray[i].eta=='' || this.vesselArray[i].remarks==''){}
          else{counter++;}
        }
        if(counter==this.vesselArray.length){
        var dt1={
          "inc_name":localStorage.getItem('Inc_name'),
          "inc_id":localStorage.getItem('Inc_id'),
          "user":this.default_user,
           "dt":this.vesselArray
             }
          this.emergencyservice.global_service('1','/vessel_board',dt1).subscribe(data=>{
            this.check_respond=data;
            if(this.check_respond.suc==1){
                if(this.get_incident_details_after_save.length==this.vesselArray.length){this.mode='updated vessel board';}
                else{this.mode='added vessel board';}
                var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BV',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
                // For Notification
                this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{
                }) 
              //For getting vessel board
               this.emergencyservice.global_service('0','/vessel_board','inc_id=' + localStorage.getItem('Inc_id')).subscribe(data=>{
                this.get_vessel_status.length=0;
                this.get_vessel_status=data;
                this.get_incident_details_after_save=this.get_vessel_status.msg;
                this.get_vessel_status=this.get_vessel_status.msg;
                if(this.get_vessel_status!=''){
                  this.display_vessel_status(0,this.get_vessel_status);//For Iterating vessel Status
                }
                else{

                }
              })
            this.myFunction();
            }
            else{
              this.toastr.errorToastr('Failed to submit','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
            }

          },error=>{
            this.toastr.errorToastr('Something Went Wrong Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
          })
        }
        else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }
      else if(this.id_create=='hel_create'){
        for(let i=0;i<this.vesselArray.length;i++){
          if(this.vesselArray[i].call_sign=='' || this.vesselArray[i].heli_type=='' || this.vesselArray[i].form_at=='' || this.vesselArray[i].etd=='' || this.vesselArray[i].to_at=='' || this.vesselArray[i].eta=='' || this.vesselArray[i].remarks==''){}
          else{counter++;}
        }
        if(counter==this.vesselArray.length){
          var dt3={
            "inc_name":localStorage.getItem('Inc_name'),
            "inc_id":localStorage.getItem('Inc_id'),
            "user":this.default_user,
             "dt":this.vesselArray
          }
        this.emergencyservice.global_service('1','/helicopter_board',dt3).subscribe(data=>{
           this.check_respond=data;
          if(this.check_respond.suc==1){
                if(this.get_incident_details_after_save.length==this.vesselArray.length){this.mode='updated helicopter board';}
                else{this.mode='added helicopter board';}
                var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BH',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
                // For Notification
               this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{
                }) 
              //SHowing Helicopter Status
              this.get_helicopter_status.length=0;
             this.emergencyservice.global_service('0','/helicopter_board','inc_id=' +localStorage.getItem('Inc_id')).subscribe(data=>{;
              this.get_helicopter_status=data;
              this.get_incident_details_after_save=this.get_helicopter_status.msg;
              this.get_helicopter_status=this.get_helicopter_status.msg;
              if(this.get_helicopter_status!=''){
                this.display_helicopter_status(0,this.get_helicopter_status);
              }
              else{

              }
            })
           this.myFunction();
          }
          else{
             this.toastr.errorToastr('Failed to submit','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
          }
        })
        }
        else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }
      else if(this.id_create=='casual'){
        for(let i=0;i<this.vesselArray.length;i++){
          if(this.vesselArray[i].full_name=='' || this.vesselArray[i].employer=='' || this.vesselArray[i].condition=='' || this.vesselArray[i].location=='' || this.vesselArray[i].time==''){}
          else{counter++;}
        }
        if(counter==this.vesselArray.length){
          var dt3={
            "inc_name":localStorage.getItem('Inc_name'),
            "inc_id":localStorage.getItem('Inc_id'),
            "user":this.default_user,
             "dt":this.vesselArray
        }
        this.emergencyservice.global_service('1','/casualty_board',dt3).subscribe(data=>{
           this.check_respond=data;
          if(this.check_respond.suc==1){   
                  
                  if(this.get_incident_details_after_save.length==this.vesselArray.length){this.mode='updated casualty board';}
                  else{this.mode='added casualty board';}
                  var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BC',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
                  // For Notification
                  this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{

                  })
             //For Showing Casualty Status
          this.emergencyservice.global_service('0','/casualty','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
            this.get_casualty_status.length=0;
            this.get_casualty_status=data;
            this.get_incident_details_after_save=this.get_casualty_status.msg;
            this.get_casualty_status=this.get_casualty_status.msg;
            this.display_casualty_status(0,this.get_casualty_status);//For Iterating Casualty Status
          })
           this.myFunction();
          }
          else{
             this.toastr.errorToastr('Failed to submit','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
          }
        },error=>{
          this.toastr.errorToastr('Something Went Wrong,Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        })
        }
        else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }
      else if(this.id_create=='evacuation'){
        for(let i=0;i<this.vesselArray.length;i++){
          if(this.vesselArray[i].destination=='' || this.vesselArray[i].mode_of_transport=='' || this.vesselArray[i].pob_remaining=='' || this.vesselArray[i].remarks==''){}
          else{counter++;}
        }
        if(counter==this.vesselArray.length){
          var dt5={
            "inc_name":localStorage.getItem('Inc_name'),
            "inc_id":localStorage.getItem('Inc_id'),
            "user":this.default_user,
             "dt":this.vesselArray
        }
        this.emergencyservice.global_service('1','/evacuation_board',dt5).subscribe(data=>{
           this.check_respond=data;
          if(this.check_respond.suc==1){
            if(this.get_incident_details_after_save.length==this.vesselArray.length){this.mode='updated evacuation board';}
            else{this.mode='added evacuation board';}
            var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BE',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
             // For Notification
               this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{
                }) 
          //For Evacuation Status
          this.get_evacuation_status.length=0;
            this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +localStorage.getItem('Inc_id')).subscribe(data=>{
              this.get_evacuation_status=data;
              this.get_incident_details_after_save=this.get_evacuation_status.msg;
              this.get_evacuation_status=this.get_evacuation_status.msg;
              if(this.get_evacuation_status!=''){
                this.display_evacuation_status(0,this.get_evacuation_status);//For Iterating Casualty Status
              }
              else{
              }
            })
           this.myFunction();
          }
          else{
             this.toastr.errorToastr('Failed to submit','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
          }
        },error=>{
          this.toastr.errorToastr('Something Went Wrong,Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        })
        }
        else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }
      else if(this.id_create=='events'){
        // For checking whether the fields are empty
       for(let i=0;i<this.vesselArray.length;i++){
         if(this.vesselArray[i].situation_status=='' || this.vesselArray[i].resource_assigned==''){}
         else{counter++;}
       }
       if(counter==this.vesselArray.length){
          var dt4={
          "inc_name":localStorage.getItem('Inc_name'),
          "inc_id":localStorage.getItem('Inc_id'),
          "user":this.default_user,
           "dt":this.vesselArray
        }
        this.emergencyservice.global_service('1','/event_log_board',dt4).subscribe(data=>{
          this.check_respond=data;
          if(this.check_respond.suc==1){

            if(this.get_incident_details_after_save.length==this.vesselArray.length){this.mode='updated events log';}
            else{this.mode='added events log';}
            var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BL',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
             // For Notification
             this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{
              }) 
          //For Eventslog Status
          this.get_events_status.length=0;
          this.emergencyservice.global_service('0','/event_log_board','inc_id=' +localStorage.getItem('Inc_id')).subscribe(data=>{
          this.get_events_status=data;
          this.get_incident_details_after_save=this.get_events_status.msg;
          this.get_events_status=this.get_events_status.msg;
          if( this.get_events_status.length > 0){
            this.display_events_status(0,this.get_events_status);
          }
          else{
          }
         })
          this.myFunction();
          }
          else{
            this.toastr.errorToastr('Failed to submit','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
          }
        },error=>{
          this.toastr.errorToastr('Something Went Wrong,Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        })
       }
       else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }
      else if(this.id_create=='pob'){
         for(let i=0;i<this.vesselArray.length;i++){
         if(this.vesselArray[i].prob_cat_id=='' || this.vesselArray[i].Time=='' || this.vesselArray[i].value==''){}
         else{counter++;}
       }
       if(counter==this.vesselArray.length){
        var dt4={
          "inc_name":localStorage.getItem('Inc_name'),
          "inc_id":localStorage.getItem('Inc_id'),
          "user":this.default_user,
           "dt":this.vesselArray
           }
           this.emergencyservice.global_service('1','/prob_board',dt4).subscribe(data=>{
            this.check_respond=data;
            if(this.check_respond.suc==1){
              if(this.get_incident_details_after_save.length==this.vesselArray.length){this.mode='updated pob board';}
              else{this.mode='added pob board';}
              var post_notification=global_url_test.getboardStatus(localStorage.getItem('Email'),'BP',this.mode,this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'))
               // For Notification
                this.emergencyservice.global_service('1','/post_notification',post_notification).subscribe(data=>{
                }) 
              this.myFunction();
              this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
                this.spinner.show("pob");
                this.get_prob_status.length=0;
                this.get_prob_status=data;
                this.get_incident_details_after_save=this.get_prob_status.msg;
                this.get_prob_status=this.get_prob_status.msg;
                this.spinner.hide("pob");
              })
            }
            else{

            }
          })
        }
        else{this.toastr.errorToastr('Some of  fields are empty, please fill them up','');}
      }    
  }
  set_modal_for_create(flag:any){
   this.id_create=flag;
   this.offshore_list.length=0;
   this.get_incident_details.length=0;
   this.get_incident_details_after_save.length=0;
  //  this.displayedColumns=flag=='vessel_view'?["Name","type","from","etd","to","eta","remarks"]:(flag=='hel_create'?["Call-Sign","type","from","etd","to","eta","remarks"]:flag=='pob'?["Full_name","Employer","Condition","etd","to","eta","remarks"]:flag=='casual'?['FULLNAME','EMPLOYER','CONDITION','LOCATION','TIME']:flag=='evacuation'?['TIME','DESTINATION','MODEOFTRANSPORT','POBREMAINING','REMARKS']:['TIME','SITUATIONSTATUS','RESOURCEASSIGNED']);
     if(this.id_create=='inc_create'){
    //For Incident Status
    this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
      this.get_incident_details=data;
      this.get_incident_details=this.get_incident_details.msg;
      if(this.get_incident_details!=''){
      this.Inc_name=this.get_incident_details[0].inc_name;
      this.Inc_id=this.get_incident_details[0].inc_no;
      localStorage.setItem('Inc_name',this.get_incident_details[0].inc_name),
      localStorage.setItem('Inc_No',this.get_incident_details[0].inc_no),
      localStorage.setItem('Inc_id',this.get_incident_details[0].id)
      this.emergencyservice.global_service('0','/inc_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        this.get_incident_details_after_save=data;
        this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
        this.LogForm.setValue({
          "inc_id":this.get_incident_details[0].id,
          "installation":this.get_incident_details[0].offshore_name,
          "coordinates":this.get_incident_details[0].lat+":"+this.get_incident_details[0].lon,
          "summary":this.get_incident_details_after_save!=''?this.get_incident_details_after_save[0].summary:"",
          "status":this.get_incident_details_after_save!=''?this.get_incident_details_after_save[0].status:""
        })
        if(this.get_incident_details_after_save!=''){
          this.dynamicArray.length=0;
          this.newDynamic='';
        for(let i=0;i<this.get_incident_details_after_save.length;i++){
          this.newDynamic = {id:this.get_incident_details_after_save[i].id,time_inc:this.get_incident_details_after_save[i].time, visibility:this.get_incident_details_after_save[i].visibility,sea_state:this.get_incident_details_after_save[i].sea_state,temp:this.get_incident_details_after_save[i].temp,wind_speed:this.get_incident_details_after_save[i].wind_speed,wind_direc:this.get_incident_details_after_save[i].wind_direc};
          this.dynamicArray.push(this.newDynamic);
        }
      }
      else{
        this.dynamicArray.length=0;
        this.newDynamic = {id:'0',time_inc: this.datePipe.transform(this.now,'hh:mma'), visibility:"",sea_state:"",temp:"",wind_speed:"",wind_direc:""};
        this.dynamicArray.push(this.newDynamic);
      }
      })
      }
      })
     }
     else if(this.id_create=='vessel_create'){
        //For Vessel Status
    this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
      // ;
      this.get_incident_details=data;
      this.get_incident_details=this.get_incident_details.msg;
      // if(this.get_incident_details!=''){
      this.LogForm.setValue({
        "inc_id":this.get_incident_details[0].id
      })
      this.emergencyservice.global_service('0','/vessel_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        ;
      this.vesselArray.length=0;
        this.get_incident_details_after_save=data;
        this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
        if(this.get_incident_details_after_save!=''){
        this.vesselArray.length=0;
          this.vesselDynamic=''
        for(let i=0;i<this.get_incident_details_after_save.length;i++){
          this.vesselDynamic = {id:this.get_incident_details_after_save[i].id,vessel_name:this.get_incident_details_after_save[i].vessel_name,vessel_type:this.get_incident_details_after_save[i].vessel_type,form_at:this.get_incident_details_after_save[i].form_at,etd:this.get_incident_details_after_save[i].etd,to_at:this.get_incident_details_after_save[i].to_at,eta:this.get_incident_details_after_save[i].eta,remarks:this.get_incident_details_after_save[i].remarks};
          this.vesselArray.push(this.vesselDynamic);
        }
      }
      else{
        this.vesselDynamic = {id:'0',vessel_name:"",vessel_type: "",form_at:"",etd:"",to_at:"",eta:"",remarks:""};
        this.vesselArray.push(this.vesselDynamic);
      }
      })
      // }
    })
     }
     else if(this.id_create=='hel_create'){
      //For Helicopter Status
      this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
        // ;
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        // if(this.get_incident_details!=''){
        this.LogForm.setValue({
          "inc_id":  localStorage.getItem('Inc_id')
        })
      this.emergencyservice.global_service('0','/helicopter_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        ;
        this.vesselArray.length=0;
        this.get_incident_details_after_save=data;
        this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
        if(this.get_incident_details_after_save!=''){
          this.vesselArray.length=0;
          this.vesselDynamic=''
        for(let i=0;i<this.get_incident_details_after_save.length;i++){
          this.vesselDynamic = {id:this.get_incident_details_after_save[i].id,call_sign:this.get_incident_details_after_save[i].call_sign ,heli_type:this.get_incident_details_after_save[i].heli_type,form_at:this.get_incident_details_after_save[i].form_at,etd:this.get_incident_details_after_save[i].etd,to_at:this.get_incident_details_after_save[i].to_at,eta:this.get_incident_details_after_save[i].eta,remarks:this.get_incident_details_after_save[i].remarks};
          this.vesselArray.push(this.vesselDynamic);
        }
      }
      else{
        this.vesselDynamic = {id:'0',call_sign:"",heli_type: "",form_at:"",etd:"",to_at:"",eta:"",remarks:""};
        this.vesselArray.push(this.vesselDynamic);
      }
      })
      // }
      })
     }
   else if(this.id_create=='casual'){
     //For Casualty Status
    this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
      ;
      this.get_incident_details=data;
      this.get_incident_details=this.get_incident_details.msg;
      this.LogForm.setValue({
        "inc_id":  localStorage.getItem('Inc_id')
      })
      // For getting employeee List
      this.emergencyservice.global_service('0','/employee','flag='+ 'A').subscribe(data=>{
        ;
        this.employee_list=data;
        this.employee_list=this.employee_list.msg;
      })
      //For getting offshore location
      this.emergencyservice.get_offshore('A').subscribe(data=>{
           ;
            this.offshore_list=data;
            this.offshore_list=this.offshore_list.msg;
      })

      this.emergencyservice.global_service('0','/casualty_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        ;
        this.vesselArray.length=0;
        this.get_incident_details_after_save=data;
        this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
        // this.check_respond=this.get_incident_details_after_save[0].time;
        if(this.get_incident_details_after_save!=''){
          this.vesselArray.length=0;
          this.vesselDynamic='';
         for(let i=0;i<this.get_incident_details_after_save.length;i++){
           this.vesselDynamic = {id:this.get_incident_details_after_save[i].id,full_name:this.get_incident_details_after_save[i].full_name,employer:this.get_incident_details_after_save[i].employer,condition:this.get_incident_details_after_save[i].emp_condition,location:this.get_incident_details_after_save[i].location,time:this.get_incident_details_after_save[i].time};
          this.vesselArray.push(this.vesselDynamic);
        }
      }
      else{
         this.vesselDynamic =  {id:"0",full_name:"",employer:"",condition:"",location:"",time:""};
        this.vesselArray.push(this.vesselDynamic);}
      })

    })
    }
    else if(this.id_create=='evacuation'){
  //For Casualty Status
  this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
    ;
    this.get_incident_details=data;
    this.get_incident_details=this.get_incident_details.msg;
    this.LogForm.setValue({
      "inc_id":  localStorage.getItem('Inc_id')
    })
        //For getting offshore location
        this.emergencyservice.get_offshore('A').subscribe(data=>{
          ;
          this.offshore_list=data;
          this.offshore_list=this.offshore_list.msg;
      })
    this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
      ;
      this.vesselArray.length=0;
      this.get_incident_details_after_save=data;
      this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
      // this.check_respond=this.get_incident_details_after_save[0].time;
        if(this.get_incident_details_after_save!=''){
            this.vesselArray.length=0;
            this.vesselDynamic=''
          for(let i=0;i<this.get_incident_details_after_save.length;i++){
            this.vesselDynamic = {id:this.get_incident_details_after_save[i].id,time:this.get_incident_details_after_save[i].time,destination:this.get_incident_details_after_save[i].destination,mode_of_transport:this.get_incident_details_after_save[i].mode_of_transport,pob_remaining:this.get_incident_details_after_save[i].pob_remaining,remarks:this.get_incident_details_after_save[i].remarks};
            this.vesselArray.push(this.vesselDynamic);
          }
        }
        else{
          this.vesselDynamic =  {id:"0",time:this.datePipe.transform(this.now,'hh:mma'),destination:"",mode_of_transport:"",pob_remaining:"",remarks:""};
          this.vesselArray.push(this.vesselDynamic);
        }
    })

  })
    }
    else if(this.id_create=='events'){
      this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
        ;
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.LogForm.setValue({
          "inc_id":  localStorage.getItem('Inc_id')
        })
        this.emergencyservice.global_service('0','/event_log_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
          // ;
          this.vesselArray.length=0;
          this.get_incident_details_after_save=data;
          this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
          if(this.get_incident_details_after_save!=''){
            this.vesselArray.length=0;
            this.vesselDynamic=''
          for(let i=0;i<this.get_incident_details_after_save.length;i++){
            this.vesselDynamic = {id:this.get_incident_details_after_save[i].id,time:this.get_incident_details_after_save[i].time,resource_assigned:this.get_incident_details_after_save[i].resource_assigned,situation_status:this.get_incident_details_after_save[i].situation_status};
            this.vesselArray.push(this.vesselDynamic);
          }
        }
        else{
          this.vesselDynamic =  {id:"0",time:this.datePipe.transform(this.now,'hh:mma'),resource_assigned:"",situation_status:""};
          this.vesselArray.push(this.vesselDynamic);
        }
        })

      })
    }
    else if(this.id_create=='pob'){
      this.get_pob_category.length=0;
      //  For Get pob Category
      this.emergencyservice.global_service('0','/get_prob_cat',null).subscribe(data=>{
        ;
        this.get_pob_category=data;
        this.get_pob_category=this.get_pob_category.msg;
      })
      this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
        ;
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.LogForm.setValue({
          "inc_id":  localStorage.getItem('Inc_id')
        })
      this.emergencyservice.global_service('0','/prob_board','inc_id=' +this.get_incident_details[0].id).subscribe(data=>{
        ;
        this.vesselArray.length=0;
        this.get_incident_details_after_save=data;
        this.get_incident_details_after_save=this.get_incident_details_after_save.msg;
        // this.check_respond=this.get_incident_details_after_save[0].time;
        if(this.get_incident_details_after_save!=''){
          this.vesselArray.length=0;
          this.vesselDynamic='';
         for(let i=0;i<this.get_incident_details_after_save.length;i++){
           this.vesselDynamic = {id:this.get_incident_details_after_save[i].id,prob_cat_id:this.get_incident_details_after_save[i].prob_cat_id,Time:this.get_incident_details_after_save[i].time,value:this.get_incident_details_after_save[i].value};
          this.vesselArray.push(this.vesselDynamic);
        }
      }
      else{
this.vesselDynamic =  {id:"0",prob_cat_id:"",Time:"",value:""};
        this.vesselArray.push(this.vesselDynamic);
        

      }
      })
    })
    }

  }
  //For FilterData from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   deleteRow(index:any) {
    if(this.id_create=='inc_create'){
    if(this.dynamicArray.length <1) {
        // return false;
    } else {
        this.dynamicArray.splice(index, 1);
        // return true;
    }
  }
  else if(this.id_create=='vessel_create' || 'hel_create' || 'casual' || 'events' || 'evacuation'){
    if(this.vesselArray.length <1) {
        // return false;
    } else {
        this.vesselArray.splice(index, 1);
        // return true;
    }

  }
}
addRow() {
  if(this.id_create=='inc_create'){
    this.newDynamic = {id:'0',time_inc: this.datePipe.transform(this.now,'hh:mma'),visibility: "",sea_state:"",temp:"",wind_speed:"",wind_direc:""};
    this.dynamicArray.push(this.newDynamic);
    // return true;
  }
  else if(this.id_create=='vessel_create'){
    this.vesselDynamic = {id:'0',vessel_name:"",vessel_type: "",form_at:"",etd:"",to_at:"",eta:"",remarks:""};
    this.vesselArray.push(this.vesselDynamic);
    // return true;
  }
  else if(this.id_create=='hel_create'){
    this.vesselDynamic = {id:'0',call_sign:"",heli_type: "",form_at:"",etd:"",to_at:"",eta:"",remarks:""};
    this.vesselArray.push(this.vesselDynamic);
    // return true;
  }
  else if(this.id_create=='casual'){
    this.vesselDynamic = {id:"0",full_name:"",employer:"",condition:"",location:"",time:""};
    this.vesselArray.push(this.vesselDynamic);
    // return true;
  }
  else if(this.id_create=='events'){
    this.vesselDynamic =  {id:"0",time:this.datePipe.transform(this.now,'hh:mma'),resource_assigned:"",situation_status:""};
    this.vesselArray.push(this.vesselDynamic);
  }
  else if(this.id_create=='evacuation'){
    this.vesselDynamic =  {id:"0",time:this.datePipe.transform(this.now,'hh:mma'),destination:"",mode_of_transport:"",pob_remaining:"",remarks:""};
    this.vesselArray.push(this.vesselDynamic);
  }
  else if(this.id_create=='pob'){
    // this.vesselDynamic =  {id:"0",time:this.datePipe.transform(this.now,'hh:mma'),destination:"",mode_of_transport:"",pob_remaining:"",remarks:""};
    // this.vesselArray.push(this.vesselDynamic);
    this.vesselDynamic =  {id:"0",prob_cat_id:"",Time:"",value:""};
    this.vesselArray.push(this.vesselDynamic);
  }
}
// For snackbar
myFunction() {
  this.y = document.getElementById("snackbar");
  this.y.className = "snackbar show";
  setTimeout(()=>{ this.y.className = this.y.className.replace("snackbar show", "snackbar"); }, 3000);
}
//for displaying vessel status continiously on the board
display_vessel_status(i:any,data1:any){
if(i>=data1.length){
    i=0;
  }
    this.ves_name=data1[i].vessel_name;
    this.form_at=data1[i].form_at+" ("+data1[i].etd+")";
    this.to_at=data1[i].to_at+" ("+data1[i].eta+")";
  setTimeout(()=>{
   i=i+1;
   this.display_vessel_status(i,data1);
  },10000)
}
//for displaying helicopter status continiously on the board
display_helicopter_status(j:any,data:any){
  if(j>=data.length){
    j=0;
  }
    this.call_sign=data[j].call_sign;
    this.hel_from=data[j].form_at+" ("+data[j].etd+")";
    this.hel_to=data[j].to_at+" ("+data[j].eta+")";
  setTimeout(()=>{
   j=j+1;
   this.display_helicopter_status(j,data);
  },10000)
}
//for displaying evacuation status continiously on the board
display_evacuation_status(j:any,data:any){
if(j>=data.length){
    j=0;
  }
    this.evacuation_time=data[j].time;
    this.transport_mode=data[j].mode_of_transport;
  setTimeout(()=>{
   j=j+1;
   this.display_evacuation_status(j,data);
  // this.spinner.hide('evacuation');
  },10000);

}
//for displaying evacuation status continiously on the board
display_events_status(j:any,data:any){
  if(j>=data.length){
    j=0;
  }
    this.resource_assigned=data[j].resource_assigned;
     this.event_time=data[j].time;
     this.situation_status=data[j].situation_status;
    setTimeout(()=>{
    j=j+1;
    this.display_events_status(j,data);
    this.event_logs=true;
    },5000)
}
//for displaying Casualty status continiously on the board
display_casualty_status(j:any,data:any){

  if(j>=data.length){
    j=0;
  }
    this.total=data[j].tot_cas;
    this.Location=data[j].offshore_name;
    this.lat=data[j].latt;
    this.long=data[j].lon;
    setTimeout(()=>{

   j=j+1;
   this.display_casualty_status(j,data);
  },10000)
}
}
