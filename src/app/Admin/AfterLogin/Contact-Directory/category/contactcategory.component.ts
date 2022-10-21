import { MatTableDataSource } from '@angular/material/table';
import { VirtualEmergencyService } from './../../../../Services/virtual-emergency.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';

@Component({
  selector: 'app-category',
  templateUrl: './contactcategory.component.html',
  styleUrls: ['./contactcategory.component.css']
})
export class ContactCategoryComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  displayedColumns: string[] = ['Sl.No','Name', 'Action'];
  constructor(private route: Router,private api_call: VirtualEmergencyService,public dialog:MatDialog,) { }

  ngOnInit(): void {
    this.getCategory();
  }

  routeToMediaModification(_id:any){
    this.route.navigate(['/admin/cntcat',btoa(_id)]);
 }
 getCategory(){
    this.api_call.global_service(0,'/contact_catg',null).pipe(map((x:any) => x.msg)).subscribe(res =>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matsort;
      })
 }
   //For FilterData from data table
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteCat(id: any,_index: any,catg_name:any){
    const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='35%';
      disalogConfig.data={id:id,api_name:'/contact_catg_del',name:'contact category'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(dt=>{
       if(dt){
        this.dataSource.data.splice(_index, 1);
        this.dataSource._updateChangeSubscription();// <== refresh data table
       }
      })
  }
}
