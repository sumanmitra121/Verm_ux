import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-add-team-status',
  templateUrl: './add-team-status.component.html',
  styleUrls: ['./add-team-status.component.css'],
})
export class AddTeamStatusComponent implements OnInit {
  _alert: boolean = true;
  // Material datatable
  displayedColumns: string[] = ['From_date', 'To_date', 'label'];
  displayedColumns_employee: string[] = [
    'Employee_name',
    'Employee_designation',
    'Employee_status',
  ];
  displayedColumns_history: string[] = [
    'From_date',
    'To_date',
    'created_at',
    'created_by',
  ];
  @ViewChild('moreBtn') moreBtn!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource = new MatTableDataSource();
  dataSource_employee = new MatTableDataSource();

  @ViewChild('logForm') LogForm!: NgForm;
  constructor(
    private emergencyservice: VirtualEmergencyService,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}
  _alert_show: boolean = true;
  ID: any = 0;
  get_team: any = [];
  get_Employee: any = [];
  ngOnInit(): void {this.getTeams();}
  getTeams() {
    this.emergencyservice
      .global_service('0', '/assign_team_dash', 'null')
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.get_team = data;
      });
  }
  //After click on view employees button
  view_employee() {
    this.emergencyservice
      .global_service(
        '0',
        '/assign_team',
        'id=' + this.LogForm.form.value.team_id
      )
      .subscribe((data) => {
        console.log(data);
        this.get_Employee.length = 0;
        this.get_Employee = data;
        this.get_Employee = this.get_Employee.msg;
        for (let i = 0; i < this.get_Employee.length; i++) {
          this.get_Employee[i].emp_status =
            this.get_Employee[i].emp_status == 'O' ? 'ON' : 'OFF';
          this.get_Employee[i].user_type =
            this.get_Employee[i].user_type == 'A'
              ? 'Admin'
              : this.get_Employee[i].user_type == 'M'
              ? 'Approver'
              : this.get_Employee[i].user_type == 'U'
              ? 'User'
              : 'Incident Commander';
        }
        this.putdata_employee(this.get_Employee);
      });
  }
  //After click on history button
  view_history() {
    this.emergencyservice
      .global_service(
        '0',
        '/pre_team_status',
        'id=' + this.LogForm.form.value.team_id
      )
      .pipe(map((x: any) => x.msg))
      .subscribe((data) => {
        this.putdata_employee(data);
      });
  }
  //For showing history and employees details of specific team
  putdata_employee(v: any) {
    this.dataSource_employee = new MatTableDataSource(v);
  }
  logSubmit(logForm: Form) {
    var dt = {
      user: localStorage.getItem('Email'),
      from_date: this.LogForm.form.value.from_date,
      to_date: this.LogForm.form.value.to_date,
      team_id: this.LogForm.form.value.team_id,
      id: this.LogForm.form.value.id,
      team_name: this.get_team.find(
        (x: any) => x.team_id == this.LogForm.form.value.team_id
      ).team_name,
    };
    this.emergencyservice
      .global_service('1', '/team_status', dt)
      .subscribe((data: any) => {
        if (data.suc == 1) {
          this.toastr.successToastr(
            dt.id > 0
              ? dt.team_name + ' Roster Updated Successfully'
              : dt.team_name + ' Roster Inserted Successfully',
            '',
            {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 5000,
            }
          );
          this.LogForm.form.patchValue({
            from_date: '',
            to_date: '',
            id: 0,
          });
          this.ID = 0;
        } else {
          this.toastr.errorToastr(
            'Something went wrong,Please try again later',
            'Error!',
            {
              position: 'bottom-right',
              animate: 'slideFromRight',
              toastTimeout: 5000,
            }
          );
        }
      });
  }
  //For showing  details of specific team roaster
  putdata(v: any) {
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort=this.matsort
  }
  //For getting row id on click on corrosponding row
  get_details_corrosponding_id(id: any, from_date: any, to_date: any) {
    this.ID = id;
    this.LogForm.form.patchValue({
      from_date: this.datePipe.transform(from_date, 'yyyy-MM-dd'),
      to_date: this.datePipe.transform(to_date, 'yyyy-MM-dd'),
      id: id,
    });
    // $('#populate').removeAttr('disabled');
    window.scrollTo(0, 0);
  }
  checkTeamRoaster(_frm_dt: any) {
    if (this.LogForm.value.team_id != '') {
      this.emergencyservice
        .global_service(
          '0',
          '/get_max_frm_dt',
          'team_id=' + this.LogForm.value.team_id
        )
        .pipe(map((x: any) => x.msg))
        .subscribe((data) => {
          console.log(data[0].from_date);
          this._alert = _frm_dt < data[0].from_date ? false : true;
        });
    }
  }
  closeAlert() {this._alert = true;}
  changeFromDt() {
    if (this.LogForm.value.from_date) {
      this.checkTeamRoaster(this.LogForm.value.from_date);
      this.LogForm.form.controls.to_date.setValue('');
    }
  }
  getToday() {return this.datePipe.transform(new Date(), 'yyyy-MM-dd');}
  SelectTeam() {
    this.spinner.show();
    if (this.LogForm.form.value.team_id != '') {
      this.emergencyservice
        .global_service('0', '/team_status', 'id=' + this.LogForm.value.team_id)
        .pipe(map((x: any) => x.msg))
        .subscribe((data) => {
          this.putdata(data);
          this.moreBtn.nativeElement.style.display = 'block';
        });
    } else {
      this.putdata([]);
      this.moreBtn.nativeElement.style.display = 'none';
    }
    this.LogForm.form.patchValue({
      from_date: '',
      to_date: '',
      id: 0,
    });
    this.closeAlert();
    this.spinner.hide();
  }
}
