import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css'],
})
export class AdminTeamComponent implements OnInit {
  //Mat tooltip position
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  positionforedit = new FormControl(this.positionOptions[2]);
  positionfordelete = new FormControl(this.positionOptions[3]);
  // Material datatable
  displayedColumns: string[] = ['Sl.No', 'Team_Type', 'Team_Name', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource = new MatTableDataSource();
  constructor(
    public dialog: MatDialog,
    private emergencyservice: VirtualEmergencyService,
    private spinner: NgxSpinnerService
  ) {}
  get_team: any = [];
  del_id: any = '';
  check_respond: any = '';
  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata() {
    this.spinner.show();
    this.emergencyservice
      .global_service('0', '/teams', 'null')
      .subscribe((data) => {
        // console.log(data);
        this.get_team = data;
        this.get_team = this.get_team.msg;
        this.putdata(this.get_team);
        this.spinner.hide();
      });
  }
  putdata(v: any) {
    this.dataSource = new MatTableDataSource(v);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
  }
  //For FilterData from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify_modal(id: any, _index: any, team_name: any) {
    // this.del_id='',this.del_id=id;
    const disalogConfig = new MatDialogConfig();
    disalogConfig.disableClose = false;
    disalogConfig.autoFocus = true;
    disalogConfig.width = '35%';
    disalogConfig.data = { id: id, api_name: '/teams_del', name: team_name };
    const dialogref = this.dialog.open(DialogalertComponent, disalogConfig);
    dialogref.afterClosed().subscribe((dt) => {
      if (dt) {
        this.dataSource.data.splice(_index, 1);
        this.dataSource._updateChangeSubscription(); // <== refresh data table
      }
    });
  }
}
