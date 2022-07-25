import { Component, OnInit, ViewChild } from '@angular/core';
import { Form} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private router:Router,private spinner:NgxSpinnerService) { }
  user:any=localStorage.getItem("Email");
  check_response:any='';
  ngOnInit(): void {
  }

  logSubmit(logForm:Form){
    // console.log(logForm);
    this.spinner.show();
    this.emergencyservice.global_service('1','/form_category',logForm).subscribe(data=>{
      console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
        this.spinner.hide();
        this.router.navigate(['/category']).then(()=>{
          this.toastr.successToastr('Category Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        });
      }
      else
      {
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      }
    })
  }
}
