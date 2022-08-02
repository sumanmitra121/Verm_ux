import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
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
  ngOnInit(): void {
    this.spinner.show();
    this.id=this.activateroute.snapshot.params['id'];
    this.getIncidentDetails(this.id);
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.add_new_Incident(logForm).subscribe((data:any)=>{
    if(data.suc==1){
    this.spinner.show();
     this.route.navigate(["/admin/incident"]).then(()=>{
       this.toastr.successToastr('Incident Type Updated Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});

     })
    }
    else{
    this.spinner.show();
      //Error Message
      this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
    }
    })

  }
  getIncidentDetails(id:any){
    this.emergencyservice.get_incident_depend_on_id(id).pipe(map((x:any)=>x.msg)).subscribe(data=>{
        this.LogForm.setValue({
          id:this.id,
          user:localStorage.getItem('Email'),
          incident_type: data[0].incident_name
        })
          this.spinner.hide();
     })
  }
  cancel(){
    this.LogForm.form.patchValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      incident_type:''
    })
  }
}
