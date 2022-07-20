import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
declare var $:any;
@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm
  headername:any='Incident Module';
  icon:any='fa-database';
  getIncident:any=[];
  id:any='';
  final_tier:any='';
  check_respond:any;
  inc_status:any='';user:any='';
  get_incident:any=[];location:any=[];initial_tier:any=[];
  constructor(private datePipe: DatePipe,private route:ActivatedRoute,private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrManager) {

   }

  ngOnInit(): void {
    this.spinner.show();
    if('edit_incidents' in localStorage){localStorage.removeItem('edit_incidents')}
  //For Incident names in dropdown
   this.emergencyservice.global_service('0','/incident',null).subscribe(data=>{
    // console.log(data);
    this.get_incident=data;
    this.get_incident=this.get_incident.msg;
  })
  //For getting location in dropdown
  this.emergencyservice.global_service('0','/offshore','flag='+'A').subscribe(data=>{
   console.log(data);
   this.location=data;
   this.location=this.location.msg;
 })
 //For getting Tier Type in dropdown
 this.emergencyservice.global_service('0','/tier',null).subscribe(data=>{
   console.log(data);
   this.initial_tier=data;
   this.initial_tier=this.initial_tier.msg;
 })
  //  Getting Id from Url
  this.id=this.route.snapshot.params['id'];
    this.emergencyservice.global_service('0','/get_incident','id='+this.id).subscribe(data=>{
     console.log(data);
     this.getIncident=data;
     this.getIncident=this.getIncident.msg;
     this.inc_status=this.getIncident[0].inc_status;
     this.user=this.getIncident[0].created_by;
        this.LogForm.setValue({
          "inc_id":this.getIncident[0].inc_no,
          "inc_type_id":this.getIncident[0].inc_type_id,
          "inc_name":this.getIncident[0].inc_name,
          "inc_location_id":this.getIncident[0].inc_location_id,
          "initial_tier_id":this.getIncident[0].initial_tier_id,
          "brief_desc":this.getIncident[0].brief_desc,
           "id":this.id,
           "user":this.user,
           "inc_status":this.inc_status
        })
        if(this.inc_status!='O'){
          this.final_tier=this.getIncident[0].final_tier_id
          var created_at=this.datePipe.transform(this.getIncident[0].created_at,'dd/MM/YYYY h:mma');
          var closed_date=this.datePipe.transform(this.getIncident[0].close_date,'dd/MM/YYYY h:mma');
          var closed_at=this.datePipe.transform(this.getIncident[0].closed_at,'dd/MM/YYYY h:mma');
          $('#created_date').val(created_at);
          $('#created_by').val(this.getIncident[0].created_by);
          $('#closed_date').val(closed_date);
          $('#close_reamrks').val(this.getIncident[0].closing_remarks);
          $('#closed_at').val(closed_at);
          $('#closed_by').val(this.getIncident[0].closed_by);
        }
        this.spinner.hide();
    })

  }
   //For Submitting Final data
      logSubmit(form: Form) {
        this.spinner.show();
        this.emergencyservice.global_service('1','/create_incident',form).subscribe(data=>{
           this.check_respond=data;
           if(this.check_respond.suc==1){
             localStorage.setItem('edit_incidents','1');
              var dt=global_url_test.get_dt(this.LogForm.form.value.id,'I',this.LogForm.form.value.inc_name,$('#type option:selected').text(),localStorage.getItem('Email'),'IU',this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'));
              this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{})
              this.spinner.hide();
              this.router.navigate(["/IncidentModule"]);
           }
           else{
            this.spinner.hide();
            this.toastr.errorToastr('Updation Failed,Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:20000});
           }
        })
      }

}
