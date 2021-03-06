import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { userDtls } from 'src/app/Model/userDtls';
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
  dataSource= new MatTableDataSource<userDtls>();
  get_user_status:any=[];
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
  }
  putdata(user_details:userDtls[]){
    this.dataSource=new MatTableDataSource(user_details);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matsort;
    // this.spinner.hide();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUsers(_e:any){
    this.putdata(_e);
  }

}
