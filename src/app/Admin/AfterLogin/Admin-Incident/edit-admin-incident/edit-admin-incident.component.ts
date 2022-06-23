import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-incident',
  templateUrl: './edit-admin-incident.component.html',
  styleUrls: ['./edit-admin-incident.component.css']
})
export class EditAdminIncidentComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  constructor(private activateroute:ActivatedRoute,private route:Router,private emergencyservice:VirtualEmergencyService,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
 id:any;
 check_response:any;
 get_incident:any=[];
  ngOnInit(): void {
    // if('update' in localStorage){localStorage.removeItem('update');}
    // if('add' in localStorage){localStorage.removeItem('add');}

    this.id=this.activateroute.snapshot.params['id'];
  this.emergencyservice.get_incident_depend_on_id(this.id).subscribe(data=>{
    //  console.log(data);
      this.get_incident=data;
      this.get_incident=this.get_incident.msg;
    this.LogForm.setValue({
      id:this.id,
    //  user:'admin@gmail.com',
    user:localStorage.getItem('Email'),

     incident_type: this.get_incident[0].incident_name
   })
   })
  
  }
  logSubmit(logForm:Form){
    // console.log(logForm);
    this.spinner.show();
    this.emergencyservice.add_new_Incident(logForm).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.suc==1){
    this.spinner.show();
      // localStorage.setItem('update','1');
     this.route.navigate(["/admin/incident"]).then(()=>{
       this.toastr.successToastr('Incident Type Updated Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
       
     })
    }
    else{
    this.spinner.show();
      //Error Message
      this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

    }

    })
    
  }
}
