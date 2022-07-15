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
  selector: 'app-edit-dashbaord',
  templateUrl: './edit-dashbaord.component.html',
  styleUrls: ['./edit-dashbaord.component.css']
})
export class EditDashbaordComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm
  headername:any='Incident Module';
  icon:any='fa-database';
  getIncident:any=[];
  id:any='';
  closing_remarks:any='';
  check_respond:any;
  inc_status:any='';
  user:any='';
  get_incident:any=[];location:any=[];initial_tier:any=[];
  constructor(private datePipe:DatePipe,private route:ActivatedRoute,private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrManager) {
   
   }

  ngOnInit(): void {
    this.spinner.show();
    //For Disabled the select drop down as template driven form can not fetch the value of element which is disabled
    $(document).ready(()=>{
      $('#initial_tier').attr('disabled','disabled');
      $('#location').attr('disabled','disabled');
      $('#inc_type').attr('disabled','disabled');
      $('#submit').attr('disabled','disabled');
    })
    if('edit_close_incidents' in localStorage){localStorage.removeItem('edit_close_incidents')} 
  //For Incident names in dropdown
   this.emergencyservice.global_service('0','/incident',null).subscribe(data=>{
    this.get_incident=data;
    this.get_incident=this.get_incident.msg;   
  })
  //For getting location in dropdown
  this.emergencyservice.global_service('0','/offshore','flag='+'A').subscribe(data=>{
   this.location=data;
   this.location=this.location.msg;
 })
 //For getting Tier Type in dropdown
 this.emergencyservice.global_service('0','/tier',null).subscribe(data=>{
   this.initial_tier=data;
   this.initial_tier=this.initial_tier.msg;
 })
  //For Fill the input field with data comming from database
  // this.id=this.route.snapshot.params['id'];
 
  this.spinner.hide();
}
   //For Submitting Final data
    logSubmit(form: Form) {
      // console.log(this.LogForm.form.value.id,localStorage.getItem('Email'),this.LogForm.form.value.inc_name,$('#inc_type option:selected').text())
      this.spinner.show();
      this.emergencyservice.global_service('1','/close_incident',form).subscribe(data=>{
          this.check_respond=data;
          if(this.check_respond.suc==1){
            this.spinner.hide();
            var dt=global_url_test.get_dt(this.LogForm.form.value.id,'I',this.LogForm.form.value.inc_name,$('#inc_type option:selected').text(),localStorage.getItem('Email'),'ICL',this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'));
              this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{
                console.log(data);
               })
               this.toastr.successToastr('Updation Successfull','Success!',{position:'top-center',animate:'slideFromTop',toastTimeout:20000});
          }
          else{
          this.spinner.hide();
          this.toastr.errorToastr('Updation Failed,Please Try Again After Some Time','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:20000});
          }
      })
    }
    get_inc_details(){
         console.log($('#inc_no').val())
        this.spinner.show();
        if($('#inc_no').val()!=''){
        this.emergencyservice.global_service('0','/get_incident','inc_no='+$('#inc_no').val()).subscribe(data=>{
          this.getIncident='';
          console.log(data); 
          this.getIncident=data;
          this.check_respond=data;
          this.getIncident=this.getIncident.msg;
          if(this.check_respond.suc==1){
            this.inc_status=this.getIncident[0].inc_status;
            this.user=this.getIncident[0].created_by;      
            this.LogForm.setValue({
              "inc_type_id":this.getIncident[0].inc_type_id,
              "inc_name":this.getIncident[0].inc_name,
              "inc_location_id":this.getIncident[0].inc_location_id,
              "initial_tier_id":this.getIncident[0].initial_tier_id,
              "brief_desc":this.getIncident[0].brief_desc,
              "id":this.getIncident[0].id,
              "user":this.user,
              "inc_status":this.inc_status,
              "final_tier_id":this.getIncident[0].final_tier_id!=null?this.getIncident[0].final_tier_id:'',
             "closing_remarks":this.getIncident[0].closing_remarks!=null?this.getIncident[0].closing_remarks:'' 
            })
            $('#created_date').val(this.datePipe.transform(this.getIncident[0].created_at,'dd/MM/YYYY h:mma'));
            $('#created_by').val(this.getIncident[0].created_by);
            $('#closed_date').val(this.datePipe.transform(this.getIncident[0].closed_date,'dd/MM/YYYY h:mma'));
            $('#closed_at').val(this.datePipe.transform(this.getIncident[0].closed_at,'dd/MM/YYYY h:mma'));
            $('#closed_by').val(this.getIncident[0].closed_by); 
            $('#submit').removeAttr('disabled'); 
            this.spinner.hide();
          }
          else{
          this.getIncident='';
          this.LogForm.reset();
           $('#inc_type').val('');
           $('#Inc_name').val('');
           $('#location').val('');
           $('#initial_tier').val('');
           $('#event_desc').val('');
           $('#created_date').val('');
           $('#created_by').val('');
           $('#closed_date').val('');
           $('#closed_at').val('');
           $('#closed_by').val('');
           $('#submit').attr('disabled','disabled'); 
             this.spinner.hide();
            this.toastr.errorToastr(this.check_respond.msg,'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:20000});
          }
        })
        }
      else{
        this.toastr.errorToastr('Please Provide Incident No.','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:20000});
         this.spinner.hide();
      }

    }
}
