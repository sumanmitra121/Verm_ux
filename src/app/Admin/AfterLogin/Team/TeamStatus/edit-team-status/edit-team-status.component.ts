import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $: any;

@Component({
  selector: 'app-edit-team-status',
  templateUrl: './edit-team-status.component.html',
  styleUrls: ['./edit-team-status.component.css']
})
export class EditTeamStatusComponent implements OnInit {
// Material datatable
displayedColumns: string[] = ['Sl.No','Name','status','from_date','to_date'];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
dataSource= new MatTableDataSource()
  constructor(private activatedroute:ActivatedRoute,private emergencyservice:VirtualEmergencyService) { }
  id:any;
  get_employee:any=[];
  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.params['id'];
   this.fetchdata();
  }

  fetchdata(){
    this.emergencyservice.global_service('0','/team_status','id='+this.id).subscribe(data=>{
      console.log(data);
      this.get_employee=data;
      this.get_employee=this.get_employee.msg;
      $('#team_id').val(this.get_employee[0].team_name);
      this.putdata(this.get_employee);
    })
  }
  putdata(v:any){
      this.dataSource=new MatTableDataSource(v);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.matsort;
  }


}
