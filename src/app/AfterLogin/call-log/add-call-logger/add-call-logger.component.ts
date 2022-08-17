
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-add-call-logger',
  templateUrl: './add-call-logger.component.html',
  styleUrls: ['./add-call-logger.component.css']
})
export class AddCallLoggerComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  headername:any='Call Logger';
  icon:any='fa-phone';
  id:any;
  get_call_log_details:any=[];
  check_response:any='';
  user:any=localStorage.getItem('Email');
  Inc_id:any=localStorage.getItem('Inc_id');
  Inc_no:any=localStorage.getItem('Inc_No');
  ref_no:any;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private emergencyService:VirtualEmergencyService,
    private toastr:ToastrManager,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    if(this.id>0){
      this.emergencyService.global_service('0','/call_log','id='+this.id).subscribe(data=>{
              this.spinner.show();
               this.get_call_log_details=data;
                 this.get_call_log_details=this.get_call_log_details.msg;
                 var dt = new Date(this.get_call_log_details[0].call_dt);
                 var dt_new = dt.getFullYear() + '-' + ((dt.getMonth() + 1) > 9 ? (dt.getMonth() + 1) : '0' + (dt.getMonth() + 1)) + '-' + (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()) + 'T' + (dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()) + ':' + (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes());
                 this.LogForm.setValue({
                   id:this.get_call_log_details[0].id,
                   ref_no:this.get_call_log_details[0].ref_no,
                   made_by:this.get_call_log_details[0].made_by,
                   made_to:this.get_call_log_details[0].made_to,
                   received_by:this.get_call_log_details[0].received_by,
                   call_datetime:dt_new,
                   call_details:this.get_call_log_details[0].call_details,
                   inc_id:this.get_call_log_details[0].inc_id,
                   user:localStorage.getItem('Email')
                 })
               this.spinner.hide();

      })
    }
    else{
     this.emergencyService.global_service('0','/get_ref_no','inc_id='+this.Inc_no).subscribe(data=>{
       console.log(data);
      this.ref_no=data;
      this.LogForm.setValue({
        id:this.id,
        ref_no:this.ref_no.msg,
        made_by:'',
        made_to:'',
        received_by:'',
        call_datetime:'',
        call_details:'',
        user:localStorage.getItem('Email'),
        inc_id:this.Inc_id
     })
    })
    }
  }

  logSubmit(logForm:Form){
   if(this.LogForm.form.value.inc_id){
      this.spinner.show();
    this.emergencyService.global_service('1','/call_log',logForm).subscribe(data=>{
        this.check_response=data;
        if(this.check_response.suc==1){
          this.spinner.hide();
          this.router.navigate(['/Call-Logger']).then(()=>{
            this.toastr.successToastr(this.check_response.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
          })
        }
        else{
          this.spinner.hide();
          this.toastr.errorToastr('Something went wrong,please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})

        }
    })
    }
    else{
           this.toastr.errorToastr('There are no active incident','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
    }
  }

}
