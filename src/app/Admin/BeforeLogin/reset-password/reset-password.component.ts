import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
@ViewChild('logForm') logform!:NgForm
  constructor(private emergencyservice : VirtualEmergencyService,private route:ActivatedRoute,private router:Router,private toaster:ToastrManager) { }
  email:any;
  flag:any;
  check_response:any;
  ngOnInit(): void {
    this.email=this.route.snapshot.params['email'];
    this.flag=this.route.snapshot.params['flag'];
  }

  submitForm(v:Form){
    // console.log(v);
    var dt={
      "en_dt":this.email,
      "password":this.logform.form.value.password
    }
    if(this.logform.form.value.password == this.logform.form.value.conf_password){
    this.emergencyservice.global_service('1','/update_pass',dt).subscribe(data=>{
      this.check_response=data;
      if(this.check_response.suc==1){
        if(this.flag=='A'){this.router.navigate(['/admin'])}
        else{this.router.navigate(['/login'])}
      }
      else{
           this.toaster.errorToastr('Something went wrong, please try again later','')
        }
      })
    }
    else{
      this.toaster.errorToastr('Password does not match','')

    }  
  }

}
