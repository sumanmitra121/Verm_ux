import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['Sl.No','Tier_Type','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource()
  get_category:any=[];
  check_respond:any='';
   del_id:any='';
  constructor(public dialog:MatDialog,private emergencyservice:VirtualEmergencyService,private toaster:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.fetchdata();}
  fetchdata(){
    this.spinner.show();
   this.emergencyservice.global_service('0','/form_category',null).subscribe(data=>{
    console.log(data);
  this.get_category=data;
  this.get_category=this.get_category.msg;
  this.putdata(this.get_category);
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

    modify_modal(id:any){
      // this.del_id='';this.del_id=id;
        const disalogConfig=new MatDialogConfig();
        disalogConfig.disableClose=false;
        disalogConfig.autoFocus=true;
        disalogConfig.width='30%';
        disalogConfig.data={id:id,api_name:'/form_category_del',name:'Category'}
        const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
        dialogref.afterClosed().subscribe(dt=>{
        this.fetchdata();
        })
  
    }

    delete_category(){
      this.emergencyservice.global_service('0','/form_category_del','id='+this.del_id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
        this.check_respond='';
        this.check_respond=data;
        if(this.check_respond.suc==1){
         this.fetchdata();
          this.toaster.successToastr('Category deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});}
          else{this.toaster.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});}
      })
    }
}
