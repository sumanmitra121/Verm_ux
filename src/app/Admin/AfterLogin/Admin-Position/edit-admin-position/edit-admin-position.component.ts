import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-position',
  templateUrl: './edit-admin-position.component.html',
  styleUrls: ['./edit-admin-position.component.css']
})
export class EditAdminPositionComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  get_position_details:any;
  check_response:any;
  id:any;

  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }


  ngOnInit(): void {
    // if('update-position' in localStorage){localStorage.removeItem('update-position');}
    // if('add-position' in localStorage){localStorage.removeItem('add-position');}

    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
    this.emergencyservice.global_service('0','/position',data).subscribe(data=>{
      console.log(data);
    this.get_position_details=data;
    this.get_position_details=this.get_position_details.msg;
    this.LogForm.setValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      position:this.get_position_details[0].position
    })
   })
  }
  logSubmit(logForm:Form){
    // console.log(logForm);
    // console.log(logForm);
    this.spinner.show();
  this.emergencyservice.global_service('1','/position',logForm).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.suc==1){
    this.spinner.hide();
      // localStorage.setItem('update-position','1');
      this.route.navigate(['/admin/position']).then(()=>{
      this.toastr.successToastr('Position Updated Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      })
    }
    else{
      //Error Message
      this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

    }
  })
  }
}
