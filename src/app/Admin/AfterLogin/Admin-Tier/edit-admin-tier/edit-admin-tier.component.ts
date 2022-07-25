import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-tier',
  templateUrl: './edit-admin-tier.component.html',
  styleUrls: ['./edit-admin-tier.component.css']
})
export class EditAdminTierComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
  id:any;
  get_tier_details:any;
  check_response:any;
  ngOnInit(): void {
    // if('update-tier' in localStorage){localStorage.removeItem('update-tier');}
    // if('add-tier' in localStorage){localStorage.removeItem('add-tier');}
    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
    this.emergencyservice.global_service('0','/tier',data).subscribe(data=>{
      // console.log(data);
    this.get_tier_details=data;
    this.get_tier_details=this.get_tier_details.msg;
    this.LogForm.setValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      tier_type:this.get_tier_details[0].tier_type
    })
  })
  }
  logSubmit(logForm:Form){
  // console.log(logForm);
  this.spinner.show();
  this.emergencyservice.global_service('1','/tier',logForm).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.suc==1){
      // localStorage.setItem('update-tier','1');
       this.spinner.hide();
      this.route.navigate(['/admin/tier']).then(()=>{
        this.toastr.successToastr('Tier Updated Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

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
