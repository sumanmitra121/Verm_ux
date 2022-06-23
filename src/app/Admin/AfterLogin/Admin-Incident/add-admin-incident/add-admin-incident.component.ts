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

 default_value:any='0';
 default_user:any=localStorage.getItem('Email');
 check_data:any;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('update' in localStorage){localStorage.removeItem('update');}
    // if('add' in localStorage){localStorage.removeItem('add');}
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    //For Adding Incident
    this.emergencyservice.add_new_Incident(logForm).subscribe(data=>{
      // console.log(data);
      this.check_data=data;
      if(this.check_data.suc==1){
        this.spinner.hide();
        // localStorage.setItem('add','1');
        this.router.navigate(['/admin/incident']).then(()=>{
          this.toastr.successToastr('Incident Type Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        })
      }
      else{   
        this.spinner.hide();
        // this.router.navigate(['/admin/incident/add']);
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

      }
        
    })
  }

}
