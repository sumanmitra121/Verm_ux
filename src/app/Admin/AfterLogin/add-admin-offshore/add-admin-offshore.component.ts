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

  ngOnInit(): void {}
  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.add_new_offshore(this.LogForm.form.value).subscribe((data:any)=>{
    if(data.suc==1){

      this.spinner.hide();
      this.router.navigate(['/admin/offshore']).then(()=>{
        this.toastr.successToastr('Offshore Added Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      });
    }
    else{
      this.spinner.hide();
      this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
    }
  })
  }
  cancel(){
    this.LogForm.form.setValue({
      Id:'0',
      user:localStorage.getItem('Email'),
      offshore_name:'',
      location:'',
      lattitude:'',
      longitude:'',
      workers_no:'',
      status:'A'
    })
  }
  ngAfterViewInit(){
    setTimeout(() => {
        this.LogForm.form.patchValue({
          id:'0',
          user:localStorage.getItem('Email'),
          status:'A'
        })
    }, 100);
  }
}
