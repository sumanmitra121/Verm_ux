import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-department',
  templateUrl: './add-admin-department.component.html',
  styleUrls: ['./add-admin-department.component.css']
})
export class AddAdminDepartmentComponent implements OnInit {

  default_value:any=0;
  check_response:any;
  default_user:any=localStorage.getItem('Email');
  constructor(private emergencyservice:VirtualEmergencyService,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('add-department' in localStorage){localStorage.removeItem('add-department');}
    // if('update-department' in localStorage){localStorage.removeItem('update-department');}
  }
  logSubmit(logForm:Form){
    // console.log(logForm);
    this.spinner.show();
    this.emergencyservice.global_service('1','/department',logForm).subscribe(data=>{
      console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
    //  localStorage.setItem('add-department','1');
    this.spinner.hide();
     this.route.navigate(['/admin/department']).then(()=>{
      this.toastr.successToastr('Department Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
     })
      }
      else{ 
    this.spinner.hide();
        //Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
      
    })

  }
}
