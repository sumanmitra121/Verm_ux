import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import { validations } from 'src/app/utilitY/validation';

@Component({
  selector: 'app-edit-dashbaord',
  templateUrl: './edit-dashbaord.component.html',
  styleUrls: ['./edit-dashbaord.component.css']
})
export class EditDashbaordComponent implements OnInit {
  @ViewChild('f') incno!: NgForm;
  incid!:string;
  @ViewChild('logForm',{static:true}) LogForm!:NgForm
  headername:any='Incident Module';
  icon:any='fa-database';
  getIncident:any=[];
  id:any='';
  closing_remarks:any='';
  check_respond:any;
  inc_status:any='';
  user:any='';
  get_incident:any=[];location:any=[];initial_tier:any=[];
  constructor(private datePipe:DatePipe,private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService,private toastr:ToastrManager) {}

  ngOnInit(): void {
     this.spinner.show();
      //For Incident names in dropdown
     this.getIncidents();
     //For getting location in dropdown
      this.getlocation();
      //For getting Tier Type in dropdown
    this.getTier();
    this.spinner.hide();
  }
getIncidents(){
  this.emergencyservice.global_service('0','/incident',null).subscribe(data=>{
    this.get_incident=data;
    this.get_incident=this.get_incident.msg;
  })
}
getlocation(){
  this.emergencyservice.global_service('0','/offshore','flag='+'A').subscribe(data=>{
    this.location=data;
    this.location=this.location.msg;
  })
}
getTier(){
  this.emergencyservice.global_service('0','/tier',null).subscribe(data=>{
    this.initial_tier=data;
    this.initial_tier=this.initial_tier.msg;
  })
}
   //For Submitting Final data
    logSubmit(form: Form) {
      console.log(form);

      var INC_TYPE = this.get_incident.find((x:any) => x.id == this.LogForm.form.controls.inc_type_id.value).incident_name
      this.spinner.show();
      this.emergencyservice.global_service('1','/close_incident',form).subscribe(data=>{
          this.check_respond=data;
          if(this.check_respond.suc==1){
            this.spinner.hide();
            var dt=global_url_test.get_dt(this.LogForm.form.value.id,'I',this.LogForm.form.value.inc_name,INC_TYPE,localStorage.getItem('Emp_name'),'ICL',this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'),this.incno.form.controls.inc_no.value);
              this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{
                // console.log(data);
               })
                localStorage.setItem('_local_sel_id',
                Number(localStorage.getItem('_local_sel_id')) > 0 ? '0':
                (Number(localStorage.getItem('_local_sel_id'))).toString());
                this.toastr.successToastr('Updation Successfull','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
               this.incid = this.incno.form.controls.inc_no.value;
              }
          else{
          this.spinner.hide();
          this.toastr.errorToastr('Updation Failed,Please Try Again After Some Time','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
          }
      })
    }
    get_inc_details(){
        this.spinner.show();
        if(this.incno.form.controls.inc_no.value!=''){
        this.emergencyservice.global_service('0','/get_incident','inc_no='+this.incno.form.controls.inc_no.value).subscribe(data=>{
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
             "closing_remarks":this.getIncident[0].closing_remarks!=null?this.getIncident[0].closing_remarks:'',
             "created_date":this.getIncident[0].created_at ? this.datePipe.transform(this.getIncident[0].created_at,'dd/MM/YYYY h:mma') : '',
             "created_by":this.getIncident[0].created_by ? this.getIncident[0].created_by : '',
             "closed_date":this.getIncident[0].closed_date ? this.datePipe.transform(this.getIncident[0].closed_date,'dd/MM/YYYY h:mma') : '',
             "closed_at":this.getIncident[0].closed_at ? this.datePipe.transform(this.getIncident[0].closed_at,'dd/MM/YYYY h:mma') : '',
             "closed_by":this.getIncident[0].closed_by ? this.getIncident[0].closed_by : ''
            })
            this.spinner.hide();
          }
          else{
          this.getIncident='';
          this.LogForm.reset();
          this.spinner.hide();
          this.toastr.errorToastr(this.check_respond.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
          }
        })
        }
      else{
        this.LogForm.reset();
        this.toastr.errorToastr('Please Provide Incident No.','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
         this.spinner.hide();
      }
    }
    //For Non Numeric Validations
PreventNonNumeric(_event:any){
  validations._preventnonNumeric(_event)
}

}
