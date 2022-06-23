import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $: any;

@Component({
  selector: 'app-assign-team',
  templateUrl: './assign-team.component.html',
  styleUrls: ['./assign-team.component.css']
})
export class AssignTeamComponent implements OnInit {
// Material datatable
displayedColumns: string[] = ['Sl.No','Team_Name','No_of_employees'];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
dataSource= new MatTableDataSource()
get_employee:any=[];
// m:any;
// m1:any;
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {

    //For show or hide bootstrap alert message on edit or adding assign team
  //   $(document).ready(()=> {
  //     $('#add').hide();
  //     $('#update').hide();
  //     if('edit-assign' in localStorage){
  //       $('#update').show();
  //       this.m='Updation Successful';
  //       }
  //       if('add-assign' in localStorage){
  //       $('#add').show();
  //         this.m1='Insertion Successful';
  //       }
  // });
    this.fetchdata();
  }
  fetchdata(){
    this.spinner.show();
    this.emergencyservice.global_service('0','/assign_team_dash',"null").subscribe(data=>{
      // console.log(data);
      this.get_employee=data;
      this.get_employee=this.get_employee.msg;
      this.putdata(this.get_employee);
      this.spinner.hide();
    })
  }
  putdata(v:any){
      this.dataSource=new MatTableDataSource(v);
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
 


}
