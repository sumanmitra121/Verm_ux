import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { userDtls } from 'src/app/Model/userDtls';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  headername:any='User Details';
  icon:any='fa fa-user';
  displayedColumns: string[] = ['User_Name','Position','Team','Status','Active Since','Last login',];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource<userDtls>();
  get_user_status:any=[];
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
  }
  putdata(user_details:userDtls[]){
    console.log(user_details);
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
  getUsers(_e:any){
    console.log(_e);

    this.putdata(_e);}
  setHoursMinutes(min:any){
    var hour = Math.floor(Number(min) / 60);
    var minutes = Number(min) - (hour * 60);
    return hour + 'H'+ ':' + minutes + 'M';
  }

}
