import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm} from '@angular/forms';
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
  @ViewChild('logForm') logForm!:NgForm;
  constructor(private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private router:Router,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {}

  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.global_service('1','/form_category',logForm).subscribe((data:any)=>{
      if(data.suc==1){
        this.spinner.hide();
        this.router.navigate(['/category']).then(()=>{
          this.toastr.successToastr('Category Added Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        });
      }
      else
      {
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      }
    })
  }
  cancel(){
   this.logForm.form.patchValue({
     user:localStorage.getItem("Email"),
     catg_name:''
   })
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.logForm.form.patchValue({
        user:localStorage.getItem("Email"),
      })
    }, 100);
  }
}
