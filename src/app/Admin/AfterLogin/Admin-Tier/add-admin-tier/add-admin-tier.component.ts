import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ToastrManager } from 'ng6-toastr-notifications'; //For Toaster
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-admin-tier',
  templateUrl: './add-admin-tier.component.html',
  styleUrls: ['./add-admin-tier.component.css'],
})
export class AddAdminTierComponent implements OnInit {
  @ViewChild('logForm') logForm!: NgForm;
  constructor(
    private emergencyservice: VirtualEmergencyService,
    private route: Router,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {}
  logSubmit(logForm: Form) {
    this.spinner.show();
    this.emergencyservice
      .global_service('1', '/tier', logForm)
      .subscribe((data: any) => {
        if (data.suc == 1) {
          this.spinner.hide();
          this.route.navigate(['/admin/tier']).then(() => {
            this.toastr.successToastr('Tier Added Successfully', '', {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 7000,
            });
          });
        } else {
          //Error Message
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
      tier_type: '',
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
