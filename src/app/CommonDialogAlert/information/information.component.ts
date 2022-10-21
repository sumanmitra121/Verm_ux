import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { DialogalertComponent } from '../dialogalert/dialogalert.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InformationComponent implements OnInit {
  arr: any=[];
  u_type:any = localStorage.getItem('User_type');
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  displayedColumns: string[] = ['Sl.No','Name','Action'];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private api_call: VirtualEmergencyService) { }

  ngOnInit(): void {
    this.setContactInformation();
  }
  routeToMediaModification(id: any){
    console.log(id);
   this.router.navigate(['/admin/cntinfo',btoa(id)])
  }
  setContactInformation(){
    this.api_call.global_service(0,'/contact_info_dash',null).pipe(map((x:any) => x.msg)).subscribe(res =>{
     if(res){
      Object.keys(res).forEach(key => {
        this.arr.push({catg_name:key,dt:res[key].info,isExpanded: false,catg_id:res[key].catg_id});
      });
      this.dataSource = new MatTableDataSource(this.arr);
      console.log(this.dataSource);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.matsort;
     }
     else{

     }

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
    deleteRow(id:any,index:any,out_index:any){
      const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='35%';
      disalogConfig.data={id:id,api_name:'/contact_info_del',name:'contact information'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(data=>{
       if(data){
        this.arr[out_index].dt.splice(index,1);
        if(this.arr[out_index].dt.length == 0){
          console.log('asdad');
          this.dataSource.data.splice(out_index,1);
          this.dataSource._updateChangeSubscription();
        }
       }
      })
    }
}
