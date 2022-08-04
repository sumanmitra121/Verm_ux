import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-edit-admin-offshore',
  templateUrl: './edit-admin-offshore.component.html',
  styleUrls: ['./edit-admin-offshore.component.css']
})
export class EditAdminOffshoreComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  get_offshore:any=[];
  Id:any;
  constructor(private activatedroute: ActivatedRoute,private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.Id=this.activatedroute.snapshot.params['id'];
    //For Getting details of corrosponding ID
    this.getOffshoreDetailsById(this.Id);
    ////END///
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    //  For Submit the details of offshore (UPDATE)
     this.emergencyservice.add_new_offshore(logForm).subscribe((data:any)=>{
        if(data.suc==1){
      this.spinner.hide();
      this.router.navigate(['/admin/offshore']).then(()=>{
        this.toastr.successToastr('Offshore Updated Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
      });
        }
        else{
        this.spinner.hide();
          //Error Message
            this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        }
     })
    }

    cancel(){
      this.LogForm.setValue({
        id:this.Id,
        user:localStorage.getItem('Email'),
        offshore_name:'',
        location:'',
        lattitude:'',
        longitude:'',
        workers_no:'',
        status:'A'
      })
    }
    getOffshoreDetailsById(id:any){
      this.emergencyservice.get_offshore_depend_on_id(id).subscribe(data=>{
        this.get_offshore=data;
         console.log(data);
         this.LogForm.setValue({
          id:this.Id,
          user:localStorage.getItem('Email'),
          offshore_name:this.get_offshore.msg[0].offshore_name,
          location:this.get_offshore.msg[0].location_name,
          lattitude:this.get_offshore.msg[0].offshore_latt,
          longitude:this.get_offshore.msg[0].offshore_long,
          workers_no:this.get_offshore.msg[0].no_of_workers,
          status:this.get_offshore.msg[0].status
        })
         this.spinner.hide();
      })
    }

}
