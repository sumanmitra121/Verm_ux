import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-repo-dashboard',
  templateUrl: './repo-dashboard.component.html',
  styleUrls: ['./repo-dashboard.component.css']
})
export class  RepoDashboardComponent implements OnInit {
  displayedColumns: string[] = ['Sl.No','Tier_Type','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource()
  check_respond:any='';
   del_id:any='';
  constructor(public dialog:MatDialog,private emergencyservice:VirtualEmergencyService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.fetchdata();}
  fetchdata(){
  this.spinner.show();
   this.emergencyservice.global_service('0','/repository_category',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
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
      // this.del_id='';this.del_id=id;
      const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='30%';
      disalogConfig.data={id:id,api_name:'/repository_category_del',name:'Category'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(dt=>{
        if(dt){
          this.dataSource.data.splice(_index, 1);
          this.dataSource._updateChangeSubscription();// <== refresh data table
        }
      })
    }


}
