import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-uploaddashboard',
  templateUrl: './uploaddashboard.component.html',
  styleUrls: ['./uploaddashboard.component.css']
})
export class UploaddashboardComponent implements OnInit {
  displayedColumns: string[] = ['Sl.No','Tier_Type','Form_Name','Form_Type','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource()
  flag:any='F';
  constructor(public dialog:MatDialog,private emergencyservice:VirtualEmergencyService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.fetchdata();}

  fetchdata(){
    this.spinner.show();
    this.emergencyservice.global_service('0','/get_forms','flag='+this.flag).pipe(map((x:any) => x.msg)).subscribe(data=>{
    this.putdata(data);
    this.spinner.hide();
    })
    }

    putdata(files:any){
      this.dataSource=new MatTableDataSource(files);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.matsort;
    }
      //For FilterData from data table
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      modify_modal(id:any,_index:any){
        const disalogConfig=new MatDialogConfig();
        disalogConfig.disableClose=false;
        disalogConfig.autoFocus=true;
        disalogConfig.width='35%';
        disalogConfig.data={id:id,api_name:'/forms_del',name:'Forms'}
        const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
        dialogref.afterClosed().subscribe(dt=>{
          if(dt){
            this.dataSource.data.splice(_index, 1);
            this.dataSource._updateChangeSubscription(); // <== refresh data table
          }
        })

      }
      change_mode(mode:any){
        this.flag=mode.value;
        this.fetchdata();
      }

}
