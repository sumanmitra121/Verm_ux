import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
declare var $ :any;
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  @ViewChild('LogForm') LogForm!:NgForm;
  @ViewChild('logForm') profile!:NgForm;
   Email:any=localStorage.getItem("Email");
  //  Name:any=localStorage.getItem('Emp_name');
   classList:any='';
   Name:any='';
   Emp_id:any=localStorage.getItem('Employee_id');
   check_response:any='';
   get_profile:any=[];
   Emp_name:any;
   notifications:any=[];
   url=global_url_test.URL;
  constructor(private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private router:Router) {}
  // hidden:boolean=false;
  i:any=0;
  ngOnInit(): void {
    this.Emp_name=localStorage.getItem('Emp_name');
    this.get_details();
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

    // For Getting Notification
    this.emergencyservice.emit('notification', {emp_id:localStorage.getItem('Employee_id')});
    this.emergencyservice.listen('get_notification').subscribe(data=>{
      console.log(data);
      this.notifications=data;this.notifications=this.notifications.users;
      // console.log(this.notifications.length)
    })

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
}
