import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-department',
  templateUrl: './edit-admin-department.component.html',
  styleUrls: ['./edit-admin-department.component.css']
})
export class EditAdminDepartmentComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  id:any;
  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
    this.getdetaprtmentDetailsById(data);
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.global_service('1','/department',logForm).subscribe((data:any)=>{
      if(data.suc==1){
        this.spinner.hide();
        this.route.navigate(['/admin/department']).then(()=>{
        this.toastr.successToastr('Department Updated Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        })
      }
      else{
        this.spinner.hide();
        //Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      }
    })
  }
  getdetaprtmentDetailsById(data:any){
    this.emergencyservice.global_service('0','/department',data).pipe(map((x:any)=> x.msg)).subscribe(data=>{
    this.LogForm.setValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      department:data[0].department_name
    })
  })
  }
  cancel(){
    this.LogForm.setValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      department:''
    })
  }

}
