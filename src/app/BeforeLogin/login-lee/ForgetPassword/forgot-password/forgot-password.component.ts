import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { Location } from '@angular/common';

declare var $:any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private emergencyservice:VirtualEmergencyService,
    private location:Location,
    private toastr:ToastrManager) { }
  check_response:any;
  ngOnInit(): void {
       //For checking existance of email
       $('#email').change(()=>{
        console.log($('#email').val());

        this.emergencyservice.global_service('0','/chk_email','email='+ $('#email').val()) .subscribe(data=>{
          console.log(data);
          this.check_response=data;
          if(this.check_response.suc==0){
            $('#check_email').val(1);
            $('#submit').removeAttr('disabled');
          }
          else{
            $('#check_email').val(0);
            this.toastr.errorToastr('Mail Does Not Exist', 'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
            $('#submit').attr('disabled', 'disabled');
          }

        })
       })
  }


  submitForm(v:Form){
    var email = $('#email').val();
    var dt={
      "email":email,
      "flag":'U'
    }
    this.emergencyservice.global_service('1','/reset_password',dt).subscribe(data=>{
      this.check_response=data;
      if(this.check_response.suc==1){
        this.toastr.successToastr('An email has been sent , please check your mail','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
      else{
        this.toastr.errorToastr(this.check_response.msg,'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
    })
  }
  backToLocation(){ this.location.back();}
}
