import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  get_inc_details:any=[];
  twoToneButton:any;
  constructor(public toastr: ToastrManager,private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService) { }
  check_response:any;
  ngOnInit(): void {}
  submitForm(logForm:Form){
    this.spinner.show();
    // var email = $('#email').val();
    // var password = $('#password').val();
      // if(email != '' && password != ''){
      this.emergencyservice.global_service('1','/admin_login',logForm).subscribe(data=>{
        this.check_response=data;
      if(this.check_response.suc==1){
        localStorage.setItem('Email',this.check_response.msg[0].email);
        localStorage.setItem('Emp_name',this.check_response.msg[0].emp_name);
        localStorage.setItem('Employee_id',this.check_response.msg[0].employee_id);
        localStorage.setItem('Emp_status',this.check_response.msg[0].emp_status);
        localStorage.setItem('User_type',this.check_response.msg[0].user_type);
        localStorage.setItem('id',this.check_response.msg[0].id);
        this.spinner.hide();
        this.emergencyservice.global_service('0','/get_active_inc',null).subscribe(data=>{
           this.get_inc_details=data;
           this.get_inc_details=this.get_inc_details.msg;
           if(this.get_inc_details==''){

           }
           else{

           }
        })
        this.router.navigate(['/admin/dashboard']);
      }
      else{
        this.spinner.hide();
       this.toastr.errorToastr(this.check_response.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:50000});
      }
    })
    // }
    // else{
    // this.spinner.hide();
    // this.toastr.errorToastr('Please fill all required field','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    // }

  }

}
