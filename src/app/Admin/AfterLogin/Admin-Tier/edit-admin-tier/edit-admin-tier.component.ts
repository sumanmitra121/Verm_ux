import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-tier',
  templateUrl: './edit-admin-tier.component.html',
  styleUrls: ['./edit-admin-tier.component.css'],
})
export class EditAdminTierComponent implements OnInit {
  @ViewChild('logForm') LogForm!: NgForm;
  constructor(
    private emergencyservice: VirtualEmergencyService,
    private activatedroute: ActivatedRoute,
    private route: Router,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService
  ) {}
  id: any;
  ngOnInit(): void {
    this.spinner.show();
    this.id = this.activatedroute.snapshot.params['id'];
    var data = 'id=' + this.id;
    this.getTierDetails(data);
  }

  getTierDetails(data: any) {
    this.emergencyservice
      .global_service('0', '/tier', data)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.LogForm.setValue({
          id: this.id,
          user: localStorage.getItem('Email'),
          tier_type: data[0].tier_type,
        });
        this.spinner.hide();
      });
  }
  logSubmit(logForm: Form) {
    this.spinner.show();
    this.emergencyservice
      .global_service('1', '/tier', logForm)
      .subscribe((data: any) => {
        if (data.suc == 1) {
          this.spinner.hide();
          this.route.navigate(['/admin/tier']).then(() => {
            this.toastr.successToastr('Tier Updated Successfully', '', {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 7000,
            });
          });
        } else {
          this.spinner.hide();
          //Error Message
          this.toastr.errorToastr(
            'Something went wrong,Please try again later',
            'Error!',
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
    this.LogForm.form.patchValue({
      id: this.id,
      user: localStorage.getItem('Email'),
      tier_type: '',
    });
  }
}
