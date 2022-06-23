import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-offshore',
  templateUrl: './add-admin-offshore.component.html',
  styleUrls: ['./add-admin-offshore.component.css']
})
export class AddAdminOffshoreComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  Status:any='A';
  User:any=localStorage.getItem('Email');
  default_value:any=0;

  get_status_after_insert:any='';
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('add-offshore' in localStorage){localStorage.removeItem('add-offshore');}
    // if('update-offshore' in localStorage){localStorage.removeItem('update-offshore');}
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    this.LogForm.value.status="A";
     this.LogForm.value.Id="0";
    //  this.LogForm.value.user="admin@gmail.com";
    this.LogForm.value.user=localStorage.getItem('Email');
    console.log(this.LogForm.form.value);
    this.emergencyservice.add_new_offshore(this.LogForm.form.value).subscribe(data=>{
    this.get_status_after_insert=data;
    if(this.get_status_after_insert.suc==1){
      // localStorage.setItem('add-offshore','1');
      this.spinner.hide();
      this.router.navigate(['/admin/offshore']).then(()=>{
        this.toastr.successToastr('Offshore Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      });
    }
    else{
      this.spinner.hide();
      this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    }
  })
  }
}
