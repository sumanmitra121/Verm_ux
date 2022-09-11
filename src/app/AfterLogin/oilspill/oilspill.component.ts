import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-oilspill',
  templateUrl: './oilspill.component.html',
  styleUrls: ['./oilspill.component.css']
})
export class OilspillComponent implements OnInit {
  @ViewChild('logForm') logForm!:NgForm;
  _FILE:any;
  incDetails:any;
  constructor(private api_call : VirtualEmergencyService,private spinner:NgxSpinnerService,
    private toastr:ToastrManager) { }
  ngOnInit(): void {}
  submit(){
    this.spinner.show();
    var user = JSON.stringify(localStorage.getItem('Email'));
    const formdata = new FormData();
    formdata.append('file',this._FILE);
    formdata.append('inc_no',this.incDetails?.inc_no);
    formdata.append('inc_id',this.incDetails?.id);
    formdata.append('user',JSON.parse(user));

    this.api_call.global_service(1,'/oil_spill_file',formdata).subscribe((res:any) =>{
      if(res.suc > 0){
        this.spinner.hide();
        var msg = 'Successfully saved as pdf in repository section under ' + this.incDetails?.inc_no + ' folder';
        this.toastr.successToastr(msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:10000})
      }
      else{
        this.spinner.hide();
        this.toastr.errorToastr("Something Went Wrong",'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:10000})

      }

    })
  }
  changeFile(event:any){this._FILE = event ? event.target.files[0] : '';}
  getIncDetails(event:any){this.incDetails = event;

  }
}
