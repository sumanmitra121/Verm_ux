import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ToastrManager } from 'ng6-toastr-notifications';//For Toaster
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-admin-tier',
  templateUrl: './add-admin-tier.component.html',
  styleUrls: ['./add-admin-tier.component.css']
})
export class AddAdminTierComponent implements OnInit {

default_value:any=0;
check_response:any;
default_user:any=localStorage.getItem('Email');
  constructor(private emergencyservice:VirtualEmergencyService,private route:Router,public toastr: ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('update-tier' in localStorage){localStorage.removeItem('update-tier');}
    // if('add-tier' in localStorage){localStorage.removeItem('add-tier');}
  }
  logSubmit(logForm:Form){
    // console.log(logForm); 
    this.spinner.show();
    this.emergencyservice.global_service('1','/tier',logForm).subscribe(data=>{
      console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
        // localStorage.setItem('add-tier','1');
         this.spinner.hide();
        this.route.navigate(['/admin/tier']).then(()=>{
        this.toastr.successToastr('Tier Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        });
      }
      else{ 
        //Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
      
    })
  }

}
