import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { global_url_test } from 'src/app/url';

@Component({
  selector: 'app-oilspill',
  templateUrl: './oilspill.component.html',
  styleUrls: ['./oilspill.component.css'],
})
export class OilspillComponent implements OnInit {
  @ViewChild('logForm') logForm!: NgForm;
  _FILE: any = [];
  incDetails: any;
  constructor(
    private api_call: VirtualEmergencyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager
  ) {}
  ngOnInit(): void {}
  submit() {


    this.spinner.show();
    if(localStorage.getItem('Inc_No')!=''){
      var user = JSON.stringify(localStorage.getItem('Email'));
      const formdata = new FormData();
      if (this._FILE.length) {
        for (let i = 0; i < this._FILE.length; i++) {
          formdata.append('file', this._FILE[i].file);
        }
      } else {
        formdata.append('file', '');
      }
      formdata.append('inc_no', this.incDetails?.inc_no);
      formdata.append('inc_id', this.incDetails?.id);
      formdata.append('user', JSON.parse(user));
      this.api_call
        .global_service(1, '/oil_spill_file', formdata)
        .subscribe((res: any) => {
          if (res.suc > 0) {
            this.spinner.hide();
            this._FILE.length =0;
            this.logForm.form.patchValue({
              file:''
            })
            var msg =
              'Successfully saved as pdf in repository section under ' +
              this.incDetails?.inc_no +
              ' folder';
            this.toastr.successToastr(msg, '', {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 10000,
            });
          } else {
            this.spinner.hide();
            this.toastr.errorToastr('Something Went Wrong', '', {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 10000,
            });
          }
        });
    }
    else{
      this.toastr.errorToastr('Sorry!! There are no incident available', '', {
        position: 'bottom-right',
        animate: 'slideFromRight',
        toastTimeout: 5000,
      });
      this.spinner.hide();
    }

  }
  changeFile(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this._FILE.push({
          name: event.target.files[i].name,
          img: URL.createObjectURL(
            new Blob([event.target.files[i]], {
              type: event.target.files[i].type.toString(),
            })
          ),
          type: event.target.files[i].name.split('.')[1],
          file: event.target.files[i],
        });
      }
    } else {
      this._FILE.length = 0;
    }
  }
  getIncDetails(event: any) {
    this.incDetails = event;
  }
  openFiles(url: any) {global_url_test.ClickToOpenFile(url);}
  deleteFiles(index: any) {this._FILE.splice(index, 1);}
}
