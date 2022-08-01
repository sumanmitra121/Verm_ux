import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import { validations } from 'src/app/utilitY/validation';
@Component({
  selector: 'app-approve-incident',
  templateUrl: './approve-incident.component.html',
  styleUrls: ['./approve-incident.component.css']
})
export class ApproveIncidentComponent implements OnInit {
  @ViewChild('f') incno!: NgForm;
  @ViewChild('approve_btn',{static:true}) approve_btn!:ElementRef
  @ViewChild('logForm') LogForm!:NgForm
  headername:any='Incident Module';
  icon:any='fa-database';
  getIncident:any=[];
  id:any='';
  app_status:any='A';
  closing_remarks:any='';
  check_respond:any;
  inc_status:any='';
  user:any='';
  get_incident:any=[];
  location:any=[];
  initial_tier:any=[];
  constructor(private datePipe: DatePipe,private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService,private toastr:ToastrManager) {}

  ngOnInit(): void {
     this.spinner.show();
      //For Incident names in dropdown
      this.getIncidentName();
      //For getting location in dropdown
      this.getLocations();
      //For getting Tier Type in dropdown
      this.getTier();
      this.spinner.hide();
  }

  getIncidentName(){
    this.emergencyservice.global_service('0','/incident',null).subscribe(data=>{
      // console.log(data);
      this.get_incident=data;
      this.get_incident=this.get_incident.msg;
    })

  }
  getLocations(){
    this.emergencyservice.global_service('0','/offshore','flag='+'A').subscribe(data=>{
      //  console.log(data);
       this.location=data;
       this.location=this.location.msg;
     })
  }
  getTier(){
    this.emergencyservice.global_service('0','/tier',null).subscribe(data=>{
      //  console.log(data);
       this.initial_tier=data;
       this.initial_tier=this.initial_tier.msg;
     })
  }

   //For Submitting Final data
      logSubmit(form: Form) {
      var INC_TYPE = this.get_incident.find((x:any) => x.id == this.LogForm.form.controls.inc_type_id.value).incident_name;
      console.log(INC_TYPE);
        this.spinner.show();
        this.emergencyservice.global_service('1','/approve_incident',form).subscribe(data=>{
           this.check_respond=data;
           if(this.check_respond.suc==1){
             this.spinner.hide();
             this.LogForm.reset();
             this.approve_btn.nativeElement.disabled = true;
             var dt=global_url_test.get_dt(this.LogForm.form.value.id,'I',this.LogForm.form.value.inc_name,INC_TYPE,localStorage.getItem('Emp_name'),'IA',this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'),this.incno.form.controls.Inc_no.value);
              this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{
               })
            this.toastr.successToastr('Updation Successfull','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
           }
           else{
            this.spinner.hide();
            this.toastr.errorToastr('Updation Failed,Please Try Again After Some Time','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
           }
        })
      }
      getInc_details(){
          this.spinner.show();
          this.getIncident='';
          if(this.incno.form.controls.Inc_no.value!=''){
          this.emergencyservice.global_service('0','/get_incident','inc_no='+this.incno.form.controls.Inc_no.value+'&is_approve=A').subscribe(data=>{
            this.getIncident=data;
            this.check_respond=data;
            this.getIncident=this.getIncident.msg;
            if(this.getIncident!=''){
              this.inc_status=this.getIncident[0].inc_status;
              this.user=this.getIncident[0].created_by;
              //For set the value with data
              this.LogForm.setValue({
                "inc_type_id":this.getIncident[0].inc_type_id,
                "inc_name":this.getIncident[0].inc_name,
                "inc_location_id":this.getIncident[0].inc_location_id,
                "initial_tier_id":this.getIncident[0].initial_tier_id,
                "brief_desc":this.getIncident[0].brief_desc,
                "id":this.getIncident[0].id,
                "user":this.user,
                "inc_status":this.getIncident[0].inc_status,
                "final_tier_id":this.getIncident[0].final_tier_id,
                "closing_remarks":this.getIncident[0].closing_remarks,
                "approval_status":'A',
                "created_date":this.getIncident[0].created_at ? this.datePipe.transform(this.getIncident[0].created_at,'dd/MM/YYYY h:mma') : '',
                "created_by":this.getIncident[0].created_by ? this.getIncident[0].created_by : '',
                "closed_date":this.getIncident[0].close_date ? this.datePipe.transform(this.getIncident[0].close_date,'dd/MM/YYYY h:mma') : '',
                 "closed_at":this.getIncident[0].closed_at ? this.datePipe.transform(this.getIncident[0].closed_at,'dd/MM/YYYY h:mma') : '',
                 "closed_by":this.getIncident[0].closed_by ? this.getIncident[0].closed_by : ''
              })
              if(this.getIncident[0].approval_status!='U'){
                this.toastr.errorToastr('This incident is already approved','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
              }
               this.approve_btn.nativeElement.style.display = this.getIncident[0].approval_status != 'U' ? 'none':'block';
               this.approve_btn.nativeElement.disabled =this.getIncident[0].approval_status != 'U' ? true : false;
               this.spinner.hide();
            }
            else{
            this.LogForm.reset();
             this.approve_btn.nativeElement.disabled = true;
               this.spinner.hide();
              this.toastr.errorToastr('No Data Found','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
            }
          })
         }
          else{
            this.LogForm.reset();
            this.spinner.hide();
            this.approve_btn.nativeElement.disabled = true;
          }
      }
  ngAfterViewInit(){
    this.approve_btn.nativeElement.disabled = true;
  }
  //For Non Numeric Validations
PreventNonNumeric(_event:any){
  validations._preventnonNumeric(_event)
}
}
