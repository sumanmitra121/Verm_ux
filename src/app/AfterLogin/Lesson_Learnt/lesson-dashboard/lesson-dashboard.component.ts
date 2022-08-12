import { Router } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lesson-dashboard',
  templateUrl: './lesson-dashboard.component.html',
  styleUrls: ['./lesson-dashboard.component.css']
})
export class LessonDashboardComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Ref', 'Title', 'Action'];
   public dataSource = new MatTableDataSource();
   @ViewChild(MatSort) matsort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api_call:VirtualEmergencyService,
    private router:Router,
    private dialog:MatDialog) { }
  ngOnInit(): void {}

  fetchData(inc_id:any,id:any){
    console.log("INC_ID:"+inc_id+"ID:"+id);

    this.api_call.global_service('0','/lesson','inc_id='+inc_id).pipe((map((x:any) => x.msg))).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getIncDetails(event:any){
    console.log(event);
    this.fetchData(event.id,event.inc_no);
  }
  Navigate(_id:any){
    this.router.navigate(['/add_lesson_learnt',btoa(_id)])
  }
  delete(id:any,_index:any){
    const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data={id:id,api_name:'/manuallog_del',name:'board Type'};
    const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{
      if(dt){
        this.dataSource.data.splice(_index,1);
        this.dataSource._updateChangeSubscription();
      }

    })
  }
}
