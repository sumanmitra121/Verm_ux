import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-edit-log-sheet',
  templateUrl: './edit-log-sheet.component.html',
  styleUrls: ['./edit-log-sheet.component.css']
})
export class EditLogSheetComponent implements OnInit {
  icon:any='fa-file-excel-o';
  headername:any='Log Sheet';
  id:any;
  user:any=localStorage.getItem('Email');
  action_dtls:any;
  action_datetime:any;
  action_by:any;
  flag:any;
  get_log_details:any;
  check_response:any;
  user_status:any=localStorage.getItem('User_type');
  constructor(private route:ActivatedRoute,private router:Router,private emergencyService:VirtualEmergencyService,private toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id=this.route.snapshot.params['id'];
    this.flag=this.route.snapshot.params['flag'];   
    this.emergencyService.global_service('0','/logsheet','id='+this.id+'&flag='+this.flag).subscribe(data=>{

              this.get_log_details=data;
              this.get_log_details=this.get_log_details.msg;
              var dt = new Date(this.get_log_details[0].action_dt);
              var dt_new = dt.getFullYear() + '-' + ((dt.getMonth() + 1) > 9 ? (dt.getMonth() + 1) : '0' + (dt.getMonth() + 1)) + '-' + (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()) + 'T' + (dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()) + ':' + (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes());
              // console.log(dt_new);
              this.action_dtls=this.get_log_details[0].action_dtls;
              // this.action_datetime=this.get_log_details[0].action_dt.split('Z')[0],
              this.action_datetime=dt_new;
              this.action_by=this.get_log_details[0].action_by;     
    })
    this.spinner.hide();
  }
  submit_logsheet(get_flag:any){

   if(get_flag=='N')
   {
     this.spinner.show()
         var dt={
          "id":this.id,
          "action_by" : this.action_by,
          "action_datetime":this.action_datetime,
          "action_dtls":this.action_dtls,
          "user":this.user}
          this.emergencyService.global_service('1','/logsheet',dt).subscribe(data=>{
                 this.check_response=data;
                 if(this.check_response.suc==1){
                  this.spinner.hide();
                  this.router.navigate(['/Log_Sheet']).then(()=>{
                    this.toastr.successToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
                  })
                }
                else{
                  this.spinner.hide();
                  this.toastr.errorToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
        
                }
          })
   }
   else{
     this.spinner.show()
    var dt1={
      "id":this.id,
      "action_by" : this.action_by,
      "approval_flag": get_flag,
      "user":this.user} 
      this.emergencyService.global_service('1','/approve_logsheet',dt1).subscribe(data=>{
        this.check_response=data;
        if(this.check_response.suc==1){
          this.spinner.hide();
         this.router.navigate(['/Log_Sheet']).then(()=>{
           this.toastr.successToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
         })
       }
       else{
        this.spinner.hide();
         this.toastr.errorToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})

       }
 })
   }
  }
}
