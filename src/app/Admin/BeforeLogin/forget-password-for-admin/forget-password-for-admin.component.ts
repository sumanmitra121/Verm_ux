import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-forget-password-for-admin',
  templateUrl: './forget-password-for-admin.component.html',
  styleUrls: ['./forget-password-for-admin.component.css']
})
export class ForgetPasswordForAdminComponent implements OnInit {
  check_response:any;
  constructor(private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager) { }

  ngOnInit(): void {
    $(document).ready(()=> {$('#submit').attr('disabled', 'disabled');})
    // $('#check_captcha').on('change', () => {
    //  var check_val = $('#check_captcha').val();
    //   if(check_val > 0 && $('#check_email').val() > 0){
    //     $('#submit').removeAttr('disabled');
    //   }else{
    //     $('#submit').attr('disabled', 'disabled');
    //   }
    // })

     //For checking existance of email
     $('#email').change(()=>{
      this.emergencyservice.global_service('0','/chk_email','email='+ $('#email').val()) .subscribe(data=>{
        console.log(data);
        this.check_response=data;
        if(this.check_response.suc==0){
          $('#check_email').val(1);
          // var check_val = $('#check_captcha').val();
          // if(check_val > 0){
            $('#submit').removeAttr('disabled');
          // }else{
          //   $('#submit').attr('disabled', 'disabled');
          // }
        }
        else{
          $('#check_email').val(0);
          this.toastr.errorToastr('Mail Does Not Exist', 'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
          $('#submit').attr('disabled', 'disabled'); 
        } 
        
      })
     })
  }
  submitForm(logForm:Form){
    var email = $('#email').val();
    var check_val = $('#check_captcha').val();
//     if(email != '' && check_val > 0){
//       this.emergencyservice.global_service('1','/login',logForm).subscribe(data=>{
//         this.check_response=data;
//       if(this.check_response.suc==1){     
//       }
//       else{
// this.toastr.errorToastr(this.check_response.msg,'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
//       }
//     })
//     }else{
//     this.toastr.errorToastr('Please fill all required field','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
//     }
    //  console.log(logForm);
    var dt={
      "email":email,
      "flag":'A'
    }
    // console.log(dt);
    
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

}
