import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-position',
  templateUrl: './edit-admin-position.component.html',
  styleUrls: ['./edit-admin-position.component.css'],
})
export class EditAdminPositionComponent implements OnInit {
  @ViewChild('logForm') LogForm!: NgForm;
  id: any;
  constructor(
    private emergencyservice: VirtualEmergencyService,
    private activatedroute: ActivatedRoute,
    private route: Router,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.spinner.show();
    this.id = this.activatedroute.snapshot.params['id'];
    var data = 'id=' + this.id;
    this.getPosition(data);
  }
  logSubmit(logForm: Form) {
    this.spinner.show();
    this.emergencyservice
      .global_service('1', '/position', logForm)
      .subscribe((data: any) => {
        if (data.suc == 1) {
          this.spinner.hide();
          // localStorage.setItem('update-position','1');
          this.route.navigate(['/admin/position']).then(() => {
            this.toastr.successToastr('Position Updated Successfully', '', {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 7000,
            });
          });
        } else {
          //Error Message
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
  getPosition(data: any) {
    this.emergencyservice
      .global_service('0', '/position', data)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.LogForm.setValue({
          id: this.id,
          user: localStorage.getItem('Email'),
          position: data[0].position,
        });
       this.spinner.hide();

      });
  }
  cancel() {
    this.LogForm.form.patchValue({
      id: this.id,
      user: localStorage.getItem('Email'),
      position: '',
    });
  }
}
