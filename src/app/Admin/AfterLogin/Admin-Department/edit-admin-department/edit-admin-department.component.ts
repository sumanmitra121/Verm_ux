import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-department',
  templateUrl: './edit-admin-department.component.html',
  styleUrls: ['./edit-admin-department.component.css']
})
export class EditAdminDepartmentComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  id:any;
  get_tier_details:any;
  check_response:any;

  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('update-department' in localStorage){localStorage.removeItem('update-department');}
    // if('add-department' in localStorage){localStorage.removeItem('add-department');}


    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
    this.emergencyservice.global_service('0','/department',data).subscribe(data=>{
      // console.log(data);
    this.get_tier_details=data;
    this.get_tier_details=this.get_tier_details.msg;
    this.LogForm.setValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      department:this.get_tier_details[0].department_name
    })
  })
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.global_service('1','/department',logForm).subscribe(data=>{
      this.check_response=data;
      if(this.check_response.suc==1){
        // localStorage.setItem('update-department','1');
        this.spinner.hide();
        this.route.navigate(['/admin/department']).then(()=>{
        this.toastr.successToastr('Department Updated Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
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
