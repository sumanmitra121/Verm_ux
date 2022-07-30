import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
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
  constructor(private datePipe: DatePipe,private route:ActivatedRoute,private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrManager) {}

  ngOnInit(): void {
     this.spinner.show();
      //For Incident names in dropdown
      this.getIncidentNames();
      //For getting location in dropdown
      this.getLocation();
      //For getting Tier Type in dropdown
      this.getTier()
      //Getting Id from Url
      this.id=this.route.snapshot.params['id'];
      this.getIncidentDetailsAgainstId(this.route.snapshot.params['id']);
  }

  getIncidentNames(){this.emergencyservice.global_service('0','/incident',null).pipe(map((x:any) => x.msg)).subscribe(data=>{this.get_incident=data;})}
  getLocation(){this.emergencyservice.global_service('0','/offshore','flag='+'A').pipe(map((x:any) => x.msg)).subscribe(data=>{    this.location=data;})}
  getTier(){this.emergencyservice.global_service('0','/tier',null).pipe(map((x:any)=>x.msg)).subscribe(data=>{this.initial_tier=data;})}
  getIncidentDetailsAgainstId(_id:any){
    this.emergencyservice.global_service('0','/get_incident','id='+_id).pipe(map((x:any)=> x.msg)).subscribe(data=>{
      this.getIncident=data;
      this.inc_status=this.getIncident[0].inc_status;
      this.user=this.getIncident[0].created_by;
         this.LogForm.form.patchValue({
           "inc_id":this.getIncident[0].inc_no,
           "inc_type_id":this.getIncident[0].inc_type_id,
           "inc_name":this.getIncident[0].inc_name,
           "inc_location_id":this.getIncident[0].inc_location_id,
           "initial_tier_id":this.getIncident[0].initial_tier_id,
           "brief_desc":this.getIncident[0].brief_desc,
            "id":_id,
            "user":this.user,
            "inc_status":this.inc_status
         })
         if(this.inc_status!='O'){
           this.final_tier=this.getIncident[0].final_tier_id
           this.LogForm.form.controls.final_tire.setValue(this.getIncident[0].final_tier_id);
          this.LogForm.form.controls.created_date.setValue(this.getIncident[0].created_at ? this.datePipe.transform(this.getIncident[0].created_at,'dd/MM/YYYY h:mma',''):'');
          this.LogForm.form.controls.created_by.setValue(this.getIncident[0].created_by ? this.getIncident[0].created_by:'');
          this.LogForm.form.controls.closed_date.setValue(this.getIncident[0].close_date ? this.datePipe.transform(this.getIncident[0].close_date,'dd/MM/YYYY h:mma',''):'');
          this.LogForm.form.controls.closing_remarks.setValue(this.getIncident[0].closing_remarks ? this.getIncident[0].closing_remarks:'');
          this.LogForm.form.controls.closed_at.setValue(this.getIncident[0].closed_at ? this.datePipe.transform(this.getIncident[0].closed_at,'dd/MM/YYYY h:mma',''):'');
          this.LogForm.form.controls.closed_by.setValue(this.getIncident[0].closed_by ? this.getIncident[0].closed_by:'');
         }
         this.inc_status!='O' ? this.LogForm.form.disable() :
                                this.LogForm.form.enable();
          this.LogForm.form.controls.inc_id.disable();
         this.spinner.hide();
     })
  }
  //For Submitting Final data
  logSubmit(form: Form) {
    this.spinner.show();
    this.emergencyservice.global_service('1','/create_incident',form).subscribe(data=>{
        this.check_respond=data;
        if(this.check_respond.suc==1){
          var INC_TYPE = this.get_incident.find((x:any) => x.id == this.LogForm.form.controls.inc_type_id.value).incident_name;
          var dt=global_url_test.get_dt(this.LogForm.form.value.id,'I',this.LogForm.form.value.inc_name,INC_TYPE,localStorage.getItem('Emp_name'),'IU',this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'),this.LogForm.form.controls.inc_id.value);
          this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{})
          this.spinner.hide();
          this.router.navigate(["/IncidentModule"]).then(()=>{
            this.toastr.successToastr('Updation Successful','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
          })
        }
        else{
        this.spinner.hide();
        this.toastr.errorToastr('Updation Failed,Please Try Again After Some Time','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        }
    })
  }
}
