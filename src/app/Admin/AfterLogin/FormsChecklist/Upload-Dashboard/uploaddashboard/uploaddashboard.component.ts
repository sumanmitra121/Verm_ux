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
  selector: 'app-uploaddashboard',
  templateUrl: './uploaddashboard.component.html',
  styleUrls: ['./uploaddashboard.component.css']
})
export class UploaddashboardComponent implements OnInit {
  displayedColumns: string[] = ['Sl.No','Tier_Type','Form_Name','Form_Type','Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource()
  Get_Uploaded_Files:any=[];
  check_respond:any='';
  del_id:any='';
  flag:any='F';
  constructor(public dialog:MatDialog,private emergencyservice:VirtualEmergencyService,private toaster:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.fetchdata();}

  fetchdata(){
    this.spinner.show(); 
    this.emergencyservice.global_service('0','/get_forms','flag='+this.flag).subscribe(data=>{
    // this.emergencyservice.global_service('0','/get_forms',null).subscribe(data=>{
    // console.log(data);
    this.Get_Uploaded_Files.length=0;
    this.Get_Uploaded_Files=data;
    this.Get_Uploaded_Files=this.Get_Uploaded_Files.msg;
    this.putdata(this.Get_Uploaded_Files);
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
        disalogConfig.data={id:id,api_name:'/forms_del',name:'Forms'}
        const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
        dialogref.afterClosed().subscribe(dt=>{
        this.fetchdata();
        })
      
      }

      delete_form(){
        this.emergencyservice.global_service('0','/forms_del','id='+this.del_id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
            this.check_respond='';
            this.check_respond=data;
            if(this.check_respond.suc==1){
             this.fetchdata();
              this.toaster.successToastr('Form deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});}
              else{this.toaster.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});}
          })
      }
      change_mode(mode:any){
        this.flag=mode.value;
        this.fetchdata();
      }

}
