import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
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
  @ViewChild('logForm') logForm!:NgForm;
  constructor(private emergencyservice:VirtualEmergencyService,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {}
  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.global_service('1','/department',logForm).subscribe((data:any)=>{
      if(data.suc==1){
    //  localStorage.setItem('add-department','1');
    this.spinner.hide();
     this.route.navigate(['/admin/department']).then(()=>{
      this.toastr.successToastr('Department Added Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
     })
      }
      else{
       this.spinner.hide();
        //Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      }

    })

  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.logForm.form.patchValue({
        id:'0',
        user:localStorage.getItem('Email')
      })
    }, 100);
  }
  cancel(){
    this.logForm.form.patchValue({
      id:'0',
      user:localStorage.getItem('Email'),
      department:''
    })
  }
}
