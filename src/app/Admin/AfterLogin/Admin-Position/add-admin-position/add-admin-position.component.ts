import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-position',
  templateUrl: './add-admin-position.component.html',
  styleUrls: ['./add-admin-position.component.css'],
})
export class AddAdminPositionComponent implements OnInit {
  @ViewChild('logForm') logForm!: NgForm;

  check_response: any;
  constructor(
    private emergencyservice: VirtualEmergencyService,
    private router: Router,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  logSubmit(logForm: Form) {
    this.spinner.show();
    this.emergencyservice
      .global_service('1', '/position', logForm)
      .subscribe((data) => {
        // console.log(data);
        this.check_response = data;
        if (this.check_response.suc == 1) {
          // localStorage.setItem('add-position','1');
          this.spinner.hide();
          this.router.navigate(['/admin/position']).then(() => {
            this.toastr.successToastr('Position Added Successfully', '', {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 7000,
            });
          });
        } else {
          this.spinner.hide();
          this.toastr.errorToastr(
            'Something went wrong,Please try again later',
            '',
            {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 7000,
            }
          );
        }
      });
  }
  cancel() {
    this.logForm.form.patchValue({
      id: '0',
      user: localStorage.getItem('Email'),
      position: '',
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.logForm.form.patchValue({
        id: '0',
        user: localStorage.getItem('Email'),
      });
    }, 100);
  }
}
