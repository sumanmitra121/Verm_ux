import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-position',
  templateUrl: './add-admin-position.component.html',
  styleUrls: ['./add-admin-position.component.css']
})
export class AddAdminPositionComponent implements OnInit {
  default_value:any='0';
  default_user:any=localStorage.getItem('Email');
  check_response:any;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('update-position' in localStorage){localStorage.removeItem('update-position');}
    // if('add-position' in localStorage){localStorage.removeItem('add-position');}
  }
  logSubmit(logForm:Form){
    // console.log(logForm);
    this.spinner.show();
    this.emergencyservice.global_service('1','/position',logForm).subscribe(data=>{
      // console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
      // localStorage.setItem('add-position','1');
     this.spinner.hide();
      this.router.navigate(['/admin/position']).then(()=>{
        this.toastr.successToastr('Position Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      });
      }
      else{
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
        
    })
  }
}
