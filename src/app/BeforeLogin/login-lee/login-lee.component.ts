import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-login-lee',
  templateUrl: './login-lee.component.html',
  styleUrls: ['./login-lee.component.css'
]
})
export class LoginLEEComponent implements OnInit {
  check_response:any;
  constructor(public toastr: ToastrManager,
    private emergencyservice:VirtualEmergencyService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {}

  submitForm(v:any){
       this.spinner.show();
       this.emergencyservice.global_service('1','/login',v).subscribe(data=>{
        this.check_response=data;
       if(this.check_response.suc==1){
        localStorage.setItem('Email',this.check_response.msg[0].email);
        localStorage.setItem('Employee_id',this.check_response.msg[0].employee_id);
        if(this.check_response.msg[0].first_login > 0){
        localStorage.setItem('Emp_name',this.check_response.msg[0].emp_name);
        localStorage.setItem('Emp_status',this.check_response.msg[0].emp_status);
        localStorage.setItem('User_type',this.check_response.msg[0].user_type);
        localStorage.setItem('active_flag',this.check_response.active_flag);
        localStorage.setItem('_local_sel_id','0');
        localStorage.setItem('_emp_id',this.check_response.msg[0].id);
        localStorage.setItem('app_flag',this.check_response.msg[0].approval_flag);
        this.spinner.hide();
        this.router.navigate(['/dashboard']);
        }
        else{
        this.spinner.hide();
          this.router.navigate(['/firstloggedin']);
        }
      }
      else{
        this.spinner.hide();
       this.toastr.errorToastr(this.check_response.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:50000});
      }
    })
  }

}
