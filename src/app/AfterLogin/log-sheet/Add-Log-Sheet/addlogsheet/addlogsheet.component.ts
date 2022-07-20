import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-addlogsheet',
  templateUrl: './addlogsheet.component.html',
  styleUrls: ['./addlogsheet.component.css']
})
export class AddlogsheetComponent implements OnInit {
  icon:any='fa-file-excel-o';
  headername:any='Log Sheet';
  user:any=localStorage.getItem('Email');
  id:any='0';
  check_response:any='';
  constructor(private emeergencyService:VirtualEmergencyService,private router:Router,private toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  submitdata(logForm:Form){
    this.emeergencyService.global_service('1','/logsheet',logForm).subscribe(data=>{
      console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
        this.spinner.hide();
        this.router.navigate(['/Log_Sheet']).then(()=>{
          this.toastr.successToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
        })
      }
      else{
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})

      }
      
    })
  }

}
