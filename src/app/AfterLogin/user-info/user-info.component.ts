import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  headername:any='User Details';
  icon:any='fa fa-user';
  displayedColumns: string[] = ['User_Name','Position','Team','Status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource();
  get_user_status:any=[];
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.spinner.show();this.fetchdata();}
  fetchdata(){
    this.emergencyservice.listen('user_status').subscribe(data=>{
      // console.log(data);
       this.get_user_status=data;
       this.get_user_status=this.get_user_status.users;
        this.putdata(this.get_user_status);
    },error=>{
      this.spinner.hide();
    })
  }
  putdata(user_details:any[]){
    this.dataSource=new MatTableDataSource(user_details);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matsort;
    this.spinner.hide();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
