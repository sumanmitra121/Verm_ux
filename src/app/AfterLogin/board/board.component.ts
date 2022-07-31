import { DatePipe } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { from } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import { validations } from 'src/app/utilitY/validation';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
// import { saveAs } from 'file-saver';
declare var $: any;
export class DynamicGrid {
  id: any;
  time_inc: any;
  visibility: any;
  sea_state: any;
  temp: any;
  wind_speed: any;
  wind_direc: any;
  temp_unit: string = 'C';
}
export class vesselGrid {
  call_sign: any;
  vessel_name: any;
  vessel_type: any;
  form_at: any;
  etd: any;
  to_at: any;
  eta: any;
  remarks: any;
  heli_type: any;
  full_name: any;
  employer: any;
  condition: any;
  location: any;
  time: any;
  situation_status: any;
  resource_assigned: any;
  destination: any;
  mode_of_transport: any;
  pob_remaining: any;
  id: any;
  date: any;
  prob_cat_id: any;
  Time: any;
  value: any;
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  //For Radio button color//
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  //End//
})
export class BoardComponent implements OnInit, OnDestroy {
  _active_flag: any = localStorage.getItem('active_flag');
  @ViewChild('myModalClose') modalClose!: ElementRef;
  temp_unit: any;
  alive = true;
  vessel_status: any;
  helicopter_status: any;
  evacuation_status: any;
  events_status: any;
  casualy_status: any;

  act_Inc_id: any;
  resource_assigned: any;
  event_time: any;
  situation_status: any;
  vessel_stats: any;
  ves_name: any;
  form_at: any;
  to_at: any;
  call_sign: any;
  hel_to: any;
  hel_from: any;
  //For the spinner
  event_logs: boolean = true;
  @ViewChild('logForm') LogForm!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  inc_visibility: any = '';
  inc_sea_state: any = '';
  inc_temparature: any = '';
  wind_speed: any = '';
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  default_user: any = localStorage.getItem('Email');
  public now: Date = new Date();
  get_incident_details: any;
  employee_list: any = [];
  offshore_list: any = [];
  get_in_status: any = []; //For Showing status of Latest Incident;
  get_vessel_status: any = []; //For Showing  status of Vessel Status
  get_casualty_status: any = [];
  get_helicopter_status: any = [];
  get_evacuation_status: any = [];
  get_prob_status: any = [];
  get_events_status: any = [];
  get_incident_details_after_save: any = [];
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  vesselArray: Array<vesselGrid> = [];
  get_pob_category: any = [];
  vesselDynamic: any = {};
  headername: any = 'Boards';
  icon: any = 'fa-users';
  id_create: any = 'inc_create';
  Inc_name: any;
  Inc_id: any;
  y: any;
  inc_name: any;
  Inc_No: any;
  Inc_location: any;
  check_respond: any;
  total: any;
  Full_name: any;
  lat: any;
  long: any;
  Location: any;
  transport_mode: any;
  evacuation_time: any;
  deg: any;
  temp: any;
  total_value: any;
  category_name: any;
  // prob_date:any;
  prob_time: any;
  mode: any;
  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private emergencyservice: VirtualEmergencyService,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
    this.act_Inc_id = localStorage.getItem('Inc_id');
    this.SetIncStatus(localStorage.getItem('Inc_id'));
    this.SetVesselStatus(localStorage.getItem('Inc_id'));
    this.setHelicopterStatus(localStorage.getItem('Inc_id'));
    this.setPobStatus(localStorage.getItem('Inc_id'));
    this.setCasualtyStatus(localStorage.getItem('Inc_id'));
    this.setEvacuationStatus(localStorage.getItem('Inc_id'));
    this.setEventStatus(localStorage.getItem('Inc_id'));
  }

  ngOnInit(): void {
    this.getOffShoreLocation();
  }

  submit(v: Form) {
    var counter = 0;
    this.check_respond = '';
    if (this.id_create == 'inc_create') {
      for (let i = 0; i < this.dynamicArray.length; i++) {
        if (
          this.dynamicArray[i].time_inc == '' ||
          this.dynamicArray[i].visibility == '' ||
          this.dynamicArray[i].sea_state == '' ||
          this.dynamicArray[i].temp == '' ||
          this.dynamicArray[i].wind_speed == '' ||
          this.dynamicArray[i].wind_direc == '' ||
          this.dynamicArray[i].temp_unit == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.dynamicArray.length) {
        var dt = {
          inc_id: localStorage.getItem('Inc_id'),
          installation: this.LogForm.form.value.installation,
          coordinates: this.LogForm.form.value.coordinates,
          summary: this.LogForm.form.value.summary,
          status: this.LogForm.form.value.status,
          user: this.default_user,
          dt: this.dynamicArray,
        };
        this.emergencyservice.global_service('1', '/inc_board', dt).subscribe(
          (data) => {
            this.check_respond = data;
            if (this.check_respond.suc == 1) {
              if (
                this.get_incident_details_after_save.length ==
                this.dynamicArray.length
              ) {
                this.mode = 'updated incident board';
              } else {
                this.mode = 'added incident board';
              }
              var post_notification = global_url_test.getboardStatus(
                localStorage.getItem('Email'),
                'BI',
                this.mode,
                this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
              );
              this.Post_notification(post_notification);
              setTimeout(() => {
                this.SetIncStatus(localStorage.getItem('Inc_id'));
                this.toastr.successToastr('Submitted Successfully');
                this.modalClose.nativeElement.click();
              }, 500);
            } else {
              this.toastr.errorToastr('Failed to submit', 'Error!', {
                position: 'top-center',
                animate: 'slideFromTop',
                toastTimeout: 5000,
              });
            }
          },
          (error) => {
            this.toastr.errorToastr(
              'Something Went Wrong,Please Try Again After Some Time',
              'Error!',
              {
                position: 'top-center',
                animate: 'slideFromTop',
                toastTimeout: 5000,
              }
            );
          }
        );
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    } else if (this.id_create == 'vessel_create') {
      for (let i = 0; i < this.vesselArray.length; i++) {
        if (
          this.vesselArray[i].vessel_name == '' ||
          this.vesselArray[i].vessel_type == '' ||
          this.vesselArray[i].form_at == '' ||
          this.vesselArray[i].etd == '' ||
          this.vesselArray[i].to_at == '' ||
          this.vesselArray[i].eta == '' ||
          this.vesselArray[i].remarks == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.vesselArray.length) {
        var dt1 = {
          inc_name: localStorage.getItem('Inc_name'),
          inc_id: localStorage.getItem('Inc_id'),
          user: this.default_user,
          dt: this.vesselArray,
        };
        this.emergencyservice
          .global_service('1', '/vessel_board', dt1)
          .subscribe(
            (data) => {
              this.check_respond = data;
              if (this.check_respond.suc == 1) {
                if (
                  this.get_incident_details_after_save.length ==
                  this.vesselArray.length
                ) {
                  this.mode = 'updated vessel board';
                } else {
                  this.mode = 'added vessel board';
                }
                var post_notification = global_url_test.getboardStatus(
                  localStorage.getItem('Email'),
                  'BV',
                  this.mode,
                  this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
                );
                this.Post_notification(post_notification);
                clearTimeout(this.vessel_status);
                setTimeout(() => {
                  this.SetVesselStatus(localStorage.getItem('Inc_id'));
                  this.toastr.successToastr('Submitted Successfully', '');
                  this.modalClose.nativeElement.click();
                }, 500);
              } else {
                this.toastr.errorToastr('Failed to submit', 'Error!', {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                });
              }
            },
            (error) => {
              this.toastr.errorToastr(
                'Something Went Wrong Please Try Again After Some Time',
                'Error!',
                {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                }
              );
            }
          );
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    } else if (this.id_create == 'hel_create') {
      for (let i = 0; i < this.vesselArray.length; i++) {
        if (
          this.vesselArray[i].call_sign == '' ||
          this.vesselArray[i].heli_type == '' ||
          this.vesselArray[i].form_at == '' ||
          this.vesselArray[i].etd == '' ||
          this.vesselArray[i].to_at == '' ||
          this.vesselArray[i].eta == '' ||
          this.vesselArray[i].remarks == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.vesselArray.length) {
        var dt3 = {
          inc_name: localStorage.getItem('Inc_name'),
          inc_id: localStorage.getItem('Inc_id'),
          user: this.default_user,
          dt: this.vesselArray,
        };
        this.emergencyservice
          .global_service('1', '/helicopter_board', dt3)
          .subscribe((data) => {
            this.check_respond = data;
            if (this.check_respond.suc == 1) {
              if (
                this.get_incident_details_after_save.length ==
                this.vesselArray.length
              ) {
                this.mode = 'updated helicopter board';
              } else {
                this.mode = 'added helicopter board';
              }
              var post_notification = global_url_test.getboardStatus(
                localStorage.getItem('Email'),
                'BH',
                this.mode,
                this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
              );
              clearTimeout(this.helicopter_status);
              this.Post_notification(post_notification);
              setTimeout(() => {
                this.setHelicopterStatus(localStorage.getItem('Inc_id'));
                this.toastr.successToastr('Submitted Successfully', '');
                this.modalClose.nativeElement.click();
              }, 500);
            } else {
              this.toastr.errorToastr('Failed to submit', 'Error!', {
                position: 'top-center',
                animate: 'slideFromTop',
                toastTimeout: 5000,
              });
            }
          });
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    } else if (this.id_create == 'casual') {
      for (let i = 0; i < this.vesselArray.length; i++) {
        if (
          this.vesselArray[i].full_name == '' ||
          this.vesselArray[i].employer == '' ||
          this.vesselArray[i].condition == '' ||
          this.vesselArray[i].location == '' ||
          this.vesselArray[i].time == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.vesselArray.length) {
        var dt3 = {
          inc_name: localStorage.getItem('Inc_name'),
          inc_id: localStorage.getItem('Inc_id'),
          user: this.default_user,
          dt: this.vesselArray,
        };
        this.emergencyservice
          .global_service('1', '/casualty_board', dt3)
          .subscribe(
            (data) => {
              this.check_respond = data;
              if (this.check_respond.suc == 1) {
                if (
                  this.get_incident_details_after_save.length ==
                  this.vesselArray.length
                ) {
                  this.mode = 'updated casualty board';
                } else {
                  this.mode = 'added casualty board';
                }
                var post_notification = global_url_test.getboardStatus(
                  localStorage.getItem('Email'),
                  'BC',
                  this.mode,
                  this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
                );
                // For Notification
                clearTimeout(this.casualy_status);
                this.Post_notification(post_notification);
                setTimeout(() => {
                  this.setCasualtyStatus(this.act_Inc_id);
                  this.toastr.successToastr('Submitted Successfully', '');
                  this.modalClose.nativeElement.click();
                }, 500);
              } else {
                this.toastr.errorToastr('Failed to submit', 'Error!', {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                });
              }
            },
            (error) => {
              this.toastr.errorToastr(
                'Something Went Wrong,Please Try Again After Some Time',
                'Error!',
                {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                }
              );
            }
          );
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    } else if (this.id_create == 'evacuation') {
      for (let i = 0; i < this.vesselArray.length; i++) {
        if (
          this.vesselArray[i].destination == '' ||
          this.vesselArray[i].mode_of_transport == '' ||
          this.vesselArray[i].pob_remaining == '' ||
          this.vesselArray[i].remarks == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.vesselArray.length) {
        var dt5 = {
          inc_name: localStorage.getItem('Inc_name'),
          inc_id: localStorage.getItem('Inc_id'),
          user: this.default_user,
          dt: this.vesselArray,
        };
        this.emergencyservice
          .global_service('1', '/evacuation_board', dt5)
          .subscribe(
            (data) => {
              this.check_respond = data;
              if (this.check_respond.suc == 1) {
                if (
                  this.get_incident_details_after_save.length ==
                  this.vesselArray.length
                ) {
                  this.mode = 'updated evacuation board';
                } else {
                  this.mode = 'added evacuation board';
                }
                var post_notification = global_url_test.getboardStatus(
                  localStorage.getItem('Email'),
                  'BE',
                  this.mode,
                  this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
                );
                clearTimeout(this.evacuation_status);
                this.Post_notification(post_notification);
                setTimeout(() => {
                  this.setEvacuationStatus(localStorage.getItem('Inc_id'));
                  this.toastr.successToastr('Submitted Successfully', '');
                  this.modalClose.nativeElement.click();
                }, 500);
              } else {
                this.toastr.errorToastr('Failed to submit', 'Error!', {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                });
              }
            },
            (error) => {
              this.toastr.errorToastr(
                'Something Went Wrong,Please Try Again After Some Time',
                'Error!',
                {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                }
              );
            }
          );
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    } else if (this.id_create == 'events') {
      // For checking whether the fields are empty
      for (let i = 0; i < this.vesselArray.length; i++) {
        if (
          this.vesselArray[i].situation_status == '' ||
          this.vesselArray[i].resource_assigned == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.vesselArray.length) {
        var dt4 = {
          inc_name: localStorage.getItem('Inc_name'),
          inc_id: localStorage.getItem('Inc_id'),
          user: this.default_user,
          dt: this.vesselArray,
        };
        this.emergencyservice
          .global_service('1', '/event_log_board', dt4)
          .subscribe(
            (data) => {
              this.check_respond = data;
              if (this.check_respond.suc == 1) {
                if (
                  this.get_incident_details_after_save.length ==
                  this.vesselArray.length
                ) {
                  this.mode = 'updated events log';
                } else {
                  this.mode = 'added events log';
                }
                var post_notification = global_url_test.getboardStatus(
                  localStorage.getItem('Email'),
                  'BL',
                  this.mode,
                  this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
                );
                clearTimeout(this.events_status);
                this.Post_notification(post_notification);
                setTimeout(() => {
                  this.setEventStatus(localStorage.getItem('Inc_id'));
                  this.toastr.successToastr('Submitted Successfully', '');
                  this.modalClose.nativeElement.click();
                }, 500);
              } else {
                this.toastr.errorToastr('Failed to submit', 'Error!', {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                });
              }
            },
            (error) => {
              this.toastr.errorToastr(
                'Something Went Wrong,Please Try Again After Some Time',
                'Error!',
                {
                  position: 'top-center',
                  animate: 'slideFromTop',
                  toastTimeout: 5000,
                }
              );
            }
          );
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    } else if (this.id_create == 'pob') {
      for (let i = 0; i < this.vesselArray.length; i++) {
        if (
          this.vesselArray[i].prob_cat_id == '' ||
          this.vesselArray[i].Time == '' ||
          this.vesselArray[i].value == ''
        ) {
        } else {
          counter++;
        }
      }
      if (counter == this.vesselArray.length) {
        var dt4 = {
          inc_name: localStorage.getItem('Inc_name'),
          inc_id: localStorage.getItem('Inc_id'),
          user: this.default_user,
          dt: this.vesselArray,
        };
        this.emergencyservice
          .global_service('1', '/prob_board', dt4)
          .subscribe((data) => {
            this.check_respond = data;
            if (this.check_respond.suc == 1) {
              this.spinner.show('pob');
              if (
                this.get_incident_details_after_save.length ==
                this.vesselArray.length
              ) {
                this.mode = 'updated pob board';
              } else {
                this.mode = 'added pob board';
              }
              var post_notification = global_url_test.getboardStatus(
                localStorage.getItem('Email'),
                'BP',
                this.mode,
                this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
              );
              this.Post_notification(post_notification);
              setTimeout(() => {
                this.setPobStatus(this.act_Inc_id);
                this.get_incident_details_after_save = this.get_prob_status;
                this.toastr.successToastr('Submitted Successfully', '');
                this.modalClose.nativeElement.click();
              }, 2000);
            } else {
            }
          });
      } else {
        this.toastr.errorToastr(
          'Some of  fields are empty, please fill them up',
          ''
        );
      }
    }
  }
  set_modal_for_create(flag: any) {
    this.id_create = flag;
    //  this.get_incident_details.length=0;
    if (this.id_create == 'inc_create') {
      // //"inc_create");
      //this.get_incident_details)
      //For Incident Status
      // this.get_incident_details_after_save.length=0;
      this.get_incident_details_after_save = this.get_in_status;

      if (this.get_incident_details_after_save.length > 0) {
        this.dynamicArray.length = 0;
        this.newDynamic = '';
        for (let i = 0; i < this.get_incident_details_after_save.length; i++) {
          this.newDynamic = {
            id: this.get_incident_details_after_save[i].id,
            time_inc: this.get_incident_details_after_save[i].time,
            visibility: this.get_incident_details_after_save[i].visibility,
            sea_state: this.get_incident_details_after_save[i].sea_state,
            temp: this.get_incident_details_after_save[i].temp,
            wind_speed: this.get_incident_details_after_save[i].wind_speed,
            wind_direc: this.get_incident_details_after_save[i].wind_direc,
            temp_unit: this.get_incident_details_after_save[i].temp_unit,
          };
          this.dynamicArray.push(this.newDynamic);
        }
      } else {
        this.dynamicArray.length = 0;
        this.newDynamic = {
          id: '0',
          time_inc: this.datePipe.transform(this.now, 'hh:mma'),
          visibility: '',
          sea_state: '',
          temp: '',
          wind_speed: '',
          wind_direc: '',
          temp_unit: 'C',
        };
        this.dynamicArray.push(this.newDynamic);
      }
      this.setFormvalue();
    } else if (this.id_create == 'vessel_create') {
      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
      });
      //.log(this.get_vessel_status.length)
      this.get_incident_details_after_save = this.get_vessel_status;
      this.vesselArray.length = 0;
      if (this.get_incident_details_after_save.length > 0) {
        this.vesselDynamic = '';
        for (let i = 0; i < this.get_incident_details_after_save.length; i++) {
          this.vesselDynamic = {
            id: this.get_incident_details_after_save[i].id,
            vessel_name: this.get_incident_details_after_save[i].vessel_name,
            vessel_type: this.get_incident_details_after_save[i].vessel_type,
            form_at: this.get_incident_details_after_save[i].form_at,
            etd: this.get_incident_details_after_save[i].etd,
            to_at: this.get_incident_details_after_save[i].to_at,
            eta: this.get_incident_details_after_save[i].eta,
            remarks: this.get_incident_details_after_save[i].remarks,
          };
          this.vesselArray.push(this.vesselDynamic);
        }
      } else {
        this.vesselDynamic = {
          id: '0',
          vessel_name: '',
          vessel_type: '',
          form_at: '',
          etd: '',
          to_at: '',
          eta: '',
          remarks: '',
        };
        this.vesselArray.push(this.vesselDynamic);
        //this.vesselArray);
      }
    } else if (this.id_create == 'hel_create') {
      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
      });
      this.vesselArray.length = 0;
      this.get_incident_details_after_save = this.get_helicopter_status;
      this.vesselArray.length = 0;
      if (this.get_incident_details_after_save.length > 0) {
        this.vesselDynamic = '';
        for (let i = 0; i < this.get_incident_details_after_save.length; i++) {
          this.vesselDynamic = {
            id: this.get_incident_details_after_save[i].id,
            call_sign: this.get_incident_details_after_save[i].call_sign,
            heli_type: this.get_incident_details_after_save[i].heli_type,
            form_at: this.get_incident_details_after_save[i].form_at,
            etd: this.get_incident_details_after_save[i].etd,
            to_at: this.get_incident_details_after_save[i].to_at,
            eta: this.get_incident_details_after_save[i].eta,
            remarks: this.get_incident_details_after_save[i].remarks,
          };
          this.vesselArray.push(this.vesselDynamic);
        }
      } else {
        this.vesselDynamic = {
          id: '0',
          call_sign: '',
          heli_type: '',
          form_at: '',
          etd: '',
          to_at: '',
          eta: '',
          remarks: '',
        };
        this.vesselArray.push(this.vesselDynamic);
      }
    } else if (this.id_create == 'casual') {
      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
      });
      // this.getOffShoreLocation();
      this.getCasualtyStatus(localStorage.getItem('Inc_id'));
    } else if (this.id_create == 'evacuation') {
      //For Casualty Status
      //.log({"ID_CREATE":this.id_create});

      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
      });
      //.log({"EVA_STATUS":this.get_evacuation_status});

      this.vesselArray.length = 0;
      this.get_incident_details_after_save = this.get_evacuation_status;
      //.log(this.get_incident_details_after_save);

      if (this.get_incident_details_after_save.length > 0) {
        // this.vesselArray.length=0;
        this.vesselDynamic = '';
        for (let i = 0; i < this.get_incident_details_after_save.length; i++) {
          this.vesselDynamic = {
            id: this.get_incident_details_after_save[i].id,
            time: this.get_incident_details_after_save[i].time,
            destination: this.get_incident_details_after_save[i].destination,
            mode_of_transport:
              this.get_incident_details_after_save[i].mode_of_transport,
            pob_remaining:
              this.get_incident_details_after_save[i].pob_remaining,
            remarks: this.get_incident_details_after_save[i].remarks,
          };
          this.vesselArray.push(this.vesselDynamic);
        }
      } else {
        this.vesselDynamic = {
          id: '0',
          time: this.datePipe.transform(this.now, 'hh:mma'),
          destination: '',
          mode_of_transport: '',
          pob_remaining: '',
          remarks: '',
        };
        this.vesselArray.push(this.vesselDynamic);
      }
    } else if (this.id_create == 'events') {
      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
      });
      // ;
      this.vesselArray.length = 0;
      this.get_incident_details_after_save = this.get_events_status;
      if (this.get_incident_details_after_save.length > 0) {
        // this.vesselArray.length=0;
        this.vesselDynamic = '';
        for (let i = 0; i < this.get_incident_details_after_save.length; i++) {
          this.vesselDynamic = {
            id: this.get_incident_details_after_save[i].id,
            time: this.get_incident_details_after_save[i].time,
            resource_assigned:
              this.get_incident_details_after_save[i].resource_assigned,
            situation_status:
              this.get_incident_details_after_save[i].situation_status,
          };
          this.vesselArray.push(this.vesselDynamic);
        }
      } else {
        this.vesselDynamic = {
          id: '0',
          time: this.datePipe.transform(this.now, 'hh:mma'),
          resource_assigned: '',
          situation_status: '',
        };
        this.vesselArray.push(this.vesselDynamic);
      }
    } else if (this.id_create == 'pob') {
      this.get_pob_category.length = 0;
      //  For Get pob Category
      this.emergencyservice
        .global_service('0', '/get_prob_cat', null)
        .subscribe((data) => {
          this.get_pob_category = data;
          this.get_pob_category = this.get_pob_category.msg;
        });

      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
      });
      this.getSetPobStatuc(localStorage.getItem('Inc_id'));
    }
  }
  //For FilterData from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteRow(index: any, _b_type: any, details: any) {
    //{"Index":index,"_b_type":_b_type,'details':details});
    const disalogConfig = new MatDialogConfig();
    disalogConfig.disableClose = false;
    disalogConfig.autoFocus = true;
    disalogConfig.width = '35%';
    disalogConfig.data = {
      board_type: _b_type,
      api_name: '',
      name: 'board Type',
      id: details,
    };
    const dialogref = this.dialog.open(DialogalertComponent, disalogConfig);
    dialogref.afterClosed().subscribe((dt) => {
      if (dt == 1) {
        //this.vesselArray);

        if (details != '0') {
          this.emergencyservice
            .global_service(
              '0',
              '/delete_board',
              'board_id=' + _b_type + '&id=' + details
            )
            .subscribe((res) => {
              this.check_respond = res;
              if (this.check_respond.suc > 0) {
                if (_b_type > 1) {
                  this.vesselArray.splice(index, 1);
                  this.setStatus(index, _b_type);
                } else {
                  this.dynamicArray.splice(index, 1);
                  this.SetIncStatus(localStorage.getItem('Inc_id'));
                }
                this.toastr.successToastr(this.check_respond.msg);
              }
            });
        } else {
          //'SS');
          _b_type > 1
            ? this.vesselArray.splice(index, 1)
            : this.dynamicArray.splice(index, 1);
        }
      }
    });
  }
  addRow() {
    if (this.id_create == 'inc_create') {
      this.newDynamic = {
        id: '0',
        time_inc: this.datePipe.transform(this.now, 'hh:mma'),
        visibility: '',
        sea_state: '',
        temp: '',
        wind_speed: '',
        wind_direc: '',
      };
      this.dynamicArray.push(this.newDynamic);
      // return true;
    } else if (this.id_create == 'vessel_create') {
      this.vesselDynamic = {
        id: '0',
        vessel_name: '',
        vessel_type: '',
        form_at: '',
        etd: '',
        to_at: '',
        eta: '',
        remarks: '',
      };
      this.vesselArray.push(this.vesselDynamic);
      // return true;
    } else if (this.id_create == 'hel_create') {
      this.vesselDynamic = {
        id: '0',
        call_sign: '',
        heli_type: '',
        form_at: '',
        etd: '',
        to_at: '',
        eta: '',
        remarks: '',
      };
      this.vesselArray.push(this.vesselDynamic);
      // return true;
    } else if (this.id_create == 'casual') {
      this.vesselDynamic = {
        id: '0',
        full_name: '',
        employer: '',
        condition: '',
        location: '',
        time: '',
      };
      this.vesselArray.push(this.vesselDynamic);
      // return true;
    } else if (this.id_create == 'events') {
      this.vesselDynamic = {
        id: '0',
        time: this.datePipe.transform(this.now, 'hh:mma'),
        resource_assigned: '',
        situation_status: '',
      };
      this.vesselArray.push(this.vesselDynamic);
    } else if (this.id_create == 'evacuation') {
      this.vesselDynamic = {
        id: '0',
        time: this.datePipe.transform(this.now, 'hh:mma'),
        destination: '',
        mode_of_transport: '',
        pob_remaining: '',
        remarks: '',
      };
      this.vesselArray.push(this.vesselDynamic);
    } else if (this.id_create == 'pob') {
      // this.vesselDynamic =  {id:"0",time:this.datePipe.transform(this.now,'hh:mma'),destination:"",mode_of_transport:"",pob_remaining:"",remarks:""};
      // this.vesselArray.push(this.vesselDynamic);
      this.vesselDynamic = { id: '0', prob_cat_id: '', Time: '', value: '' };
      this.vesselArray.push(this.vesselDynamic);
    }
  }
  // For snackbar
  myFunction() {
    this.y = document.getElementById('snackbar');
    this.y.className = 'snackbar show';
    setTimeout(() => {
      this.y.className = this.y.className.replace('snackbar show', 'snackbar');
    }, 3000);
  }
  //for displaying vessel status continiously on the board
  display_vessel_status(i: any, data1: any) {
    if (i >= data1.length) {
      i = 0;
    }
    if (data1 != '') {
      this.ves_name = data1[i].vessel_name;
      this.form_at = data1[i].form_at + ' (' + data1[i].etd + ')';
      this.to_at = data1[i].to_at + ' (' + data1[i].eta + ')';
    }

    this.vessel_status = setTimeout(() => {
      i = i + 1;
      if (!this.alive) {
        return;
      }
      this.display_vessel_status(i, data1);
    }, 10000);
  }
  //for displaying helicopter status continiously on the board
  display_helicopter_status(j: any, data: any) {
    if (j >= data.length) {
      j = 0;
    }
    if (data != '') {
      this.call_sign = data[j].call_sign;
      this.hel_from = data[j].form_at + ' (' + data[j].etd + ')';
      this.hel_to = data[j].to_at + ' (' + data[j].eta + ')';
    }
    this.helicopter_status = setTimeout(() => {
      j = j + 1;
      if (!this.alive) {
        return;
      }
      this.display_helicopter_status(j, data);
    }, 10000);
  }
  //for displaying evacuation status continiously on the board
  display_evacuation_status(j: any, data: any) {
    if (j >= data.length) {
      j = 0;
    }
    if (data != '') {
      this.evacuation_time = data[j].time;
      this.transport_mode = data[j].mode_of_transport;
    }

    this.evacuation_status = setTimeout(() => {
      j = j + 1;
      if (!this.alive) {
        return;
      }
      this.display_evacuation_status(j, data);
      // this.spinner.hide('evacuation');
    }, 10000);
  }
  //for displaying evacuation status continiously on the board
  display_events_status(j: any, data: any) {
    if (j >= data.length) {
      j = 0;
    }
    if (data != '') {
      this.resource_assigned = data[j].resource_assigned;
      this.event_time = data[j].time;
      this.situation_status = data[j].situation_status;
    }
    this.events_status = setTimeout(() => {
      j = j + 1;
      if (!this.alive) {
        return;
      }
      this.display_events_status(j, data);
      this.event_logs = true;
    }, 5000);
  }
  //for displaying Casualty status continiously on the board
  display_casualty_status(j: any, data: any) {
    if (j >= data.length) {
      j = 0;
    }
    if (data != '') {
      this.total = data[j].tot_cas;
      this.Location = data[j].offshore_name;
      this.lat = data[j].latt;
      this.long = data[j].lon;
    }
    this.casualy_status = setTimeout(() => {
      j = j + 1;
      if (!this.alive) {
        return;
      }
      this.display_casualty_status(j, data);
    }, 10000);
  }

  ngOnDestroy() {
    this.alive = false;
    clearTimeout(this.vessel_status);
    clearTimeout(this.helicopter_status);
    clearTimeout(this.evacuation_status);
    clearTimeout(this.events_status);
    clearTimeout(this.casualy_status);
  }
  setStatus(index: any, _b_type: any) {
    //.log({"Index":index,"Type":_b_type});
    switch (_b_type) {
      case 2:
        this.get_vessel_status.splice(index, 1);
        break;
      case 3:
        this.get_helicopter_status.splice(index, 1);
        break;
      case 4:
        this.setPobStatus(localStorage.getItem('Inc_id'));
        break;
      case 5:
        clearTimeout(this.casualy_status);
        this.setCasualtyStatus(localStorage.getItem('Inc_id'));
        break;
      case 6:
        this.get_evacuation_status.splice(index, 1);
        break;
      case 7:
        this.get_events_status.splice(index, 1);
        break;
      default:
        break;
    }
    //.log({"vesselArray":this.vesselArray,"ActualDATA":this.get_vessel_status});
  }

  SetIncStatus(_id: any) {
    //_id)
    this.emergencyservice
      .global_service('0', '/inc_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        //data);
        //.log(data);

        this.get_in_status = data;
        this.get_incident_details_after_save = data;

        //data);

        from(data)
          .pipe(take(1))
          .subscribe((res: any) => {
            //.log(res);
            if (res != '') {
              this.inc_visibility = res.visibility;
              this.inc_sea_state = res.sea_state;
              this.inc_temparature = res.temp;
              // this.deg=res.temp.charAt(res.temp.length-1);
              this.temp = res.temp.split(this.deg)[0];
              this.wind_speed = res.wind_speed;
              this.temp_unit = res.temp_unit;
            }
          });
      });
  }
  SetVesselStatus(_id: any) {
    //For Showing Vessel Status
    this.emergencyservice
      .global_service('0', '/vessel_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.get_vessel_status.length = 0;
        this.get_vessel_status = data;
        //.log(this.get_vessel_status);
        this.get_incident_details_after_save = this.get_vessel_status;
        if (this.get_vessel_status.length > 0) {
          this.display_vessel_status(0, this.get_vessel_status); //For Iterating vessel Status
        }
      });
  }

  setHelicopterStatus(_id: any) {
    //Showing Helicopter Status
    this.emergencyservice
      .global_service('0', '/helicopter_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.get_helicopter_status.length = 0;
        this.get_helicopter_status = data;
        this.get_incident_details_after_save = this.get_helicopter_status;
        if (this.get_helicopter_status.length > 0) {
          this.display_helicopter_status(0, this.get_helicopter_status);
        }
      });
  }
  setPobStatus(_id: any) {
    // For Pob Status
    this.emergencyservice
      .global_service('0', '/prob_board_dashboard', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.spinner.show('pob');
        this.get_prob_status.length = 0;
        this.get_prob_status = data;
        //.log(data);
        this.spinner.hide('pob');
      });
  }

  setCasualtyStatus(_id: any) {
    this.emergencyservice
      .global_service('0', '/casualty', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.get_casualty_status.length = 0;
        this.get_casualty_status = data;
        this.get_incident_details_after_save = this.get_casualty_status;
        //.log(this.get_casualty_status);
        if (this.get_casualty_status.length > 0) {
          this.display_casualty_status(0, this.get_casualty_status); //For Iterating Casualty Status
        }
      });
  }

  setEvacuationStatus(_id: any) {
    //     //For Evacuation Status
    this.emergencyservice
      .global_service('0', '/evacuation_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.get_evacuation_status.length = 0;
        this.get_evacuation_status = data;
        this.get_incident_details_after_save = this.get_evacuation_status;
        if (this.get_evacuation_status.length > 0) {
          this.display_evacuation_status(0, this.get_evacuation_status); //For Iterating Casualty Status
        }
      });
  }

  setEventStatus(_id: any) {
    //     //For Eventslog Status
    this.emergencyservice
      .global_service('0', '/event_log_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.get_events_status.length = 0;
        this.get_events_status = data;
        this.get_incident_details_after_save = this.get_events_status;
        if (this.get_events_status.length > 0) {
          this.display_events_status(0, this.get_events_status);
        }
      });
    // this.spinner.hide()
    setTimeout(() => {
      if ('id_create' in localStorage) {
        //.log("SS");
        //"openModal")
        this.id_create = localStorage.getItem('id_create');
        var modal = '#' + this.id_create;
        $(modal).click();
        localStorage.removeItem('id_create');
      }
    }, 500);
  }

  Post_notification(_pNotification: any) {
    // For Notification
    this.emergencyservice
      .global_service('1', '/post_notification', _pNotification)
      .subscribe((data) => {});
  }
  getOffShoreLocation() {
    //For getting offshore location
    this.emergencyservice
      .get_offshore('A')
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.offshore_list = data;
      });
  }

  getCasualtyStatus(_id: any) {
    this.emergencyservice
      .global_service('0', '/casualty_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.vesselArray.length = 0;
        this.get_incident_details_after_save = data;
        if (this.get_incident_details_after_save.length > 0) {
          this.vesselArray.length = 0;
          this.vesselDynamic = '';
          for (
            let i = 0;
            i < this.get_incident_details_after_save.length;
            i++
          ) {
            this.vesselDynamic = {
              id: this.get_incident_details_after_save[i].id,
              full_name: this.get_incident_details_after_save[i].full_name,
              employer: this.get_incident_details_after_save[i].employer,
              condition: this.get_incident_details_after_save[i].emp_condition,
              location: this.get_incident_details_after_save[i].location,
              time: this.get_incident_details_after_save[i].time,
            };
            this.vesselArray.push(this.vesselDynamic);
          }
        } else {
          this.vesselDynamic = {
            id: '0',
            full_name: '',
            employer: '',
            condition: '',
            location: '',
            time: '',
          };
          this.vesselArray.push(this.vesselDynamic);
        }
      });
  }
  getSetPobStatuc(_id: any) {
    this.emergencyservice
      .global_service('0', '/prob_board', 'inc_id=' + _id)
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.vesselArray.length = 0;
        this.get_incident_details_after_save = data;
        if (this.get_incident_details_after_save.length > 0) {
          // this.vesselArray.length=0;
          this.vesselDynamic = '';
          for (
            let i = 0;
            i < this.get_incident_details_after_save.length;
            i++
          ) {
            this.vesselDynamic = {
              id: this.get_incident_details_after_save[i].id,
              prob_cat_id: this.get_incident_details_after_save[i].prob_cat_id,
              Time: this.get_incident_details_after_save[i].time,
              value: this.get_incident_details_after_save[i].value,
            };
            this.vesselArray.push(this.vesselDynamic);
          }
        } else {
          this.vesselDynamic = {
            id: '0',
            prob_cat_id: '',
            Time: '',
            value: '',
          };
          this.vesselArray.push(this.vesselDynamic);
        }
      });
  }
  setFormvalue() {
    setTimeout(() => {
      //this.get_incident_details);

      this.LogForm.form.patchValue({
        inc_id: localStorage.getItem('Inc_id'),
        installation: this.get_incident_details.offshore_name,
        coordinates:
          this.get_incident_details.lat + ':' + this.get_incident_details.lon,
        summary:
          this.get_in_status.length > 0 ? this.get_in_status[0]?.summary : '',
        status:
          this.get_in_status.length > 0 ? this.get_in_status[0]?.status : '',
      });
    }, 500);
  }
  //For Non Numeric Validations
  PreventNonNumeric(_event: any) {
    validations._preventnonNumeric(_event);
  }
  preventNumber(_event: any) {
    validations._preventNumber(_event);
  }
  getIncDetails(e: any) {
    this.get_incident_details = e;
    this.Inc_name = e.inc_name;
    this.Inc_id = e.inc_no;
    this.ngOnDestroy();
    this.SetIncStatus(localStorage.getItem('Inc_id'));
    this.SetVesselStatus(localStorage.getItem('Inc_id'));
    this.setHelicopterStatus(localStorage.getItem('Inc_id'));
    this.setPobStatus(localStorage.getItem('Inc_id'));
    this.setCasualtyStatus(localStorage.getItem('Inc_id'));
    this.setEvacuationStatus(localStorage.getItem('Inc_id'));
    this.setEventStatus(localStorage.getItem('Inc_id'));
    this.alive = true;
  }
}
