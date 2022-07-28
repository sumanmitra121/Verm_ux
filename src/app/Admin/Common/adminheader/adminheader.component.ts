import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import { validations } from 'src/app/utilitY/validation';
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  _c_pass:boolean = true;
  _n_pass:boolean = true;
  _o_pass:boolean = true;
  @ViewChild('LogForm') LogForm!:NgForm;
  @ViewChild('logForm') profile!:NgForm;
  @ViewChild('MatTabGroup') tabGroup!: MatTabGroup;
   Email:any=localStorage.getItem("Email");
   _select_tab:any = 0;
   classList:any='';
   Name:any='';
   Emp_id:any=localStorage.getItem('Employee_id');
   check_response:any='';
   get_profile:any=[];
   Emp_name:any;
   notifications:any=[];
   url=global_url_test.URL;
   _date:any;
  constructor(private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private router:Router) {
   var d = new Date();
   var _timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   this._date = d.toLocaleString('en-Us',{timeZone:_timeZone});
  }
  // hidden:boolean=false;
  i:any=0;
  ngOnInit(): void {
    // this.getNotifications();
    this.Emp_name=localStorage.getItem('Emp_name');
    this.get_details();
    // For Getting Notification
    this.emergencyservice.emit('notification', {emp_id:localStorage.getItem('Employee_id')});
    this.emergencyservice.listen('get_notification').subscribe(data=>{
      console.log(data);
      this.notifications=data;this.notifications=this.notifications.users;
      // console.log(this.notifications.length)
    })

  }
  getNotifications(){
    // this.emergencyservice.emit('notification', {emp_id:localStorage.getItem('Employee_id')});
    // this.emergencyservice.listen('get_notification').subscribe(data=>{
    //   console.log(data);
    // })
  }
  show_pass(_type:any){
    switch(_type){
      case 'O':this._o_pass =!this._o_pass;break;
      case 'C':this._c_pass =!this._c_pass;break;
      case 'N':this._n_pass =!this._n_pass;break;
      default:break;
    }
  }

  logout(){
    this.router.navigate(['/admin']);localStorage.clear();}
  get_details(){
    this.emergencyservice.global_service('0','/Employee','id='+localStorage.getItem('id')).subscribe(data=>{
     this.get_profile.length=0;
     this.get_profile=data;
     this.get_profile=this.get_profile.msg;
     localStorage.removeItem('Emp_name');
    localStorage.setItem('Emp_name',this.get_profile[0].emp_name);
    this.Name=localStorage.getItem('Emp_name');
     this.profile.setValue({
       user:this.Email,
       emp_id:this.Emp_id,
       emp_name:this.get_profile[0].emp_name,
       email:this.Email,
       per_cnct_no:this.get_profile[0].personal_cnct_no,
       er_cnct_no:this.get_profile[0].er_cnct_no,
       user_type:this.get_profile[0].user_type=="A"? "Admin" : ""
     })
    })
  }
  Submit(logForm:any){
    // console.log(logForm);
    this.emergencyservice.global_service('1','/update_info_admin ',logForm).subscribe(data=>{
      this.check_response='';
            this.check_response=data;
            if(this.check_response.suc==1){
              this.toastr.successToastr('Updation successful','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
              this.get_details();
            }
            else{
              this.toastr.errorToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

            }
    })

  }
  Submit_password(logForm:any){
    if(this.LogForm.form.value.pass!=this.LogForm.form.value.conf_pass){
      this.toastr.errorToastr('Passwords are not getting matched','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    }
    else{
      this.emergencyservice.global_service('1','/reset_pass',logForm).subscribe(data=>{
        this.check_response='';
        this.check_response=data;
        if(this.check_response.suc==1){
           this.toastr.successToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
        }
        else{
          this.toastr.errorToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
        }
      })
    }
  }
  //For Non Numeric Validations
  PreventNonNumeric(_event:any){
    validations._preventnonNumeric(_event)
  }
}
