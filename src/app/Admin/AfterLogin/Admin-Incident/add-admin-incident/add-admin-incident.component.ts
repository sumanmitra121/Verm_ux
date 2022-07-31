import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-incident',
  templateUrl: './add-admin-incident.component.html',
  styleUrls: ['./add-admin-incident.component.css']
})
export class AddAdminIncidentComponent implements OnInit {
@ViewChild('logForm') logForm!:NgForm
 default_value:any='0';
 default_user:any=localStorage.getItem('Email');
 check_data:any;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {}
  logSubmit(logForm:Form){
    this.spinner.show();
    //For Adding Incident
    this.emergencyservice.add_new_Incident(logForm).subscribe((data:any)=>{
      if(data.suc==1){
        this.spinner.hide();
        // localStorage.setItem('add','1');
        this.router.navigate(['/admin/incident']).then(()=>{
          this.toastr.successToastr('Incident Type Added Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        })
      }
      else{
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});

      }

    })
  }
  cancel(){
    this.logForm.setValue({
      id:'0',
      user:localStorage.getItem('Email'),
      incident_type:''
    })
  }
  ngAfterViewInit(){
     setTimeout(() => {
        this.logForm.form.patchValue({
          id:'0',
          user:localStorage.getItem('Email'),
        })
    }, 100);
  }
}
