import { VirtualEmergencyService } from './../../../Services/virtual-emergency.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { global_url_test } from 'src/app/url';

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.css']
})
export class InvestigationComponent implements OnInit {
  _url= global_url_test.URL;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[]=['id','inc_name','reported_by','reported_on','Action'];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr:ToastrManager,
    private api_call:VirtualEmergencyService,
    private spinner:NgxSpinnerService
    ) {this.spinner.show();}

  ngOnInit(): void {this.fetchData();}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchData(){
    this.api_call.global_service(0,'/investigation',null).pipe(map((x:any) => x.msg)).subscribe(res =>{
       console.log(res);

      this.dataSource = new MatTableDataSource(res);
            this.spinner.hide();
    })
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  Navigate(type: any){this.router.navigate(['/investigationRPT',btoa(type)]);}

  delete(id:any,_index:any){
    console.log(_index);

    console.log(id);
    this.deleteReport(id,_index)
  }

  deleteReport(id:any,_index:any){
    const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data = {
      api_name: '',
      name: 'board Type',
      id: id,
    };
    const dialogref = this.dialog.open(DialogalertComponent, disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{
      if(dt){
        this.api_call.global_service(0,'/investigation_del','flag='+1+'&id='+id).subscribe((res:any) =>{
                 if(res.suc > 0){
                  this.dataSource.data.splice(_index,1);
                  this.dataSource._updateChangeSubscription();// <== refresh data table
                  this.toastr.successToastr(res.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
                 }
                 else{
                    this.toastr.errorToastr('deletion not possible! try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
                 }
        })

      }
    })
 }
}
