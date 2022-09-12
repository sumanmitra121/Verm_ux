import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $ :any;
@Component({
  selector: 'app-firstloggedinchange-password',
  templateUrl: './firstloggedinchange-password.component.html',
  styleUrls: ['./firstloggedinchange-password.component.css']
})
export class FirstloggedinchangePasswordComponent implements OnInit {
@ViewChild('logForm') LogForm!:NgForm;
  constructor(private toaster:ToastrManager,private router:Router,private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }
  Emp_id:any=localStorage.getItem('Employee_id');
  user:any=localStorage.getItem('Email');
  chk_response:any;
  chk_input_status:any;
  ngOnInit(): void {

    //For toggling eye and eye-slash for old password
    $(".toggle-password").click(()=>{
      if ($('#old_pass').attr("type") == "password") {
        $('#old_pass').attr("type", "text");
        $('.toggle-password').removeClass("fa-eye-slash");
        $('.toggle-password').addClass("fa-eye");
      } else {
        $('#old_pass').attr("type", "password");
        $('.toggle-password').removeClass("fa-eye");
        $('.toggle-password').addClass("fa-eye-slash");
      }
  });

    //For toggling eye and eye-slash for new password
  $(".toggle-newpassword").click(()=>{
    if ($('#pass').attr("type") == "password") {
      $('#pass').attr("type", "text");
    $('.toggle-newpassword').removeClass("fa-eye-slash");
    $('.toggle-newpassword').addClass("fa-eye");
    } else {
      $('#pass').attr("type", "password");
      $('.toggle-newpassword').removeClass("fa-eye");
      $('.toggle-newpassword').addClass("fa-eye-slash");
    }
});

  //For toggling eye and eye-slash for confirm password
 $(".toggle-confpassword").click(()=>{
      if ($('#conf_pass').attr("type") == "password") {
        $('#conf_pass').attr("type", "text");
      $('.toggle-confpassword').removeClass("fa-eye-slash");
      $('.toggle-confpassword').addClass("fa-eye");
      } else {
        $('#conf_pass').attr("type", "password");
        $('.toggle-confpassword').removeClass("fa-eye");
        $('.toggle-confpassword').addClass("fa-eye-slash");
      }
  });
  }
  Submit(logForm:Form){
    this.spinner.show();
    if(this.LogForm.form.value.pass!=this.LogForm.form.value.conf_pass){
     this.spinner.show();
     this.toaster.errorToastr('Passwords are not same','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    }
    else{
    this.emergencyservice.global_service('1','/first_change_pass',logForm).subscribe(data=>{
      this.chk_response='';
      this.chk_response=data;
      if(this.chk_response.suc==1){
          this.spinner.hide();
          this.router.navigate(['/login']).then(()=>{
            this.toaster.successToastr(this.chk_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          })
      }
      else{
        this.spinner.hide();
        this.toaster.errorToastr(this.chk_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})

      }
    })
    }

  }

}
