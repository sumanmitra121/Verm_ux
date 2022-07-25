import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  user:any=localStorage.getItem("Email");
  constructor(private emergencyservice:VirtualEmergencyService,private toaster:ToastrManager,private router:Router,private spinner:NgxSpinnerService) { }
  get_category:any=[];
  check_cat:any=[];
  catg_name:any;
  check_response:any='';
  get_file:any='';
 
  ngOnInit(): void {
    this.emergencyservice.global_service('0','/form_category',null).subscribe(data=>{
      // console.log(data);
      this.get_category=data;
      this.get_category=this.get_category.msg;
      })
  }

  select_file(event:any){this.get_file='';this.get_file=event.target.files[0];}
  select_category(){
    this.emergencyservice.global_service('0','/form_category',null).subscribe(data=>{
     this.catg_name='';
      this.check_cat=data;
      this.check_cat=this.check_cat.msg;
      for(let i=0;i<this.check_cat.length;i++){
        if(this.check_cat[i].id==this.LogForm.form.value.catg_id){
          this.catg_name=this.check_cat[i].catg_name
        }
      }     
      })
  }
  submit(logForm:Form){
    this.spinner.show();
    const formdata=new FormData();
    formdata.append("catg_id",this.LogForm.form.value.catg_id);
    formdata.append("catg_name",this.catg_name)
    formdata.append("file",this.get_file!=undefined?this.get_file : '');
    formdata.append("form_name",this.LogForm.form.value.form_name);
    formdata.append("form_type",this.LogForm.form.value.form_type);
    formdata.append("user",this.user);
    this.emergencyservice.global_service('1','/get_forms',formdata).subscribe(data=>{
      this.check_response=data;
      if(this.check_response.suc==1){
        this.spinner.hide();
        this.router.navigate(['/UploadDashBoard']).then(()=>{
          this.toaster.successToastr('Form Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        });
      }
      else
      {
        this.spinner.hide();
        this.toaster.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
    })
    

  }

}
