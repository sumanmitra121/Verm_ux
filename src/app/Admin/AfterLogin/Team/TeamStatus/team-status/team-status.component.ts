import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit {
// Material datatable
displayedColumns: string[] = ['Sl.No','Team','From_Date','To_Date','Action'];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
dataSource= new MatTableDataSource();
get_team_status:any;
m1:any;
  constructor(private emergencyservice:VirtualEmergencyService) { }

  ngOnInit(): void {
    $(document).ready(()=> {
      $('#add-status').hide();
      if('add-status' in localStorage){
        $('#add-status').show();
        this.m1='Insertion Successful';
        }});
    this.fetchdata();
    //For click yes button inside the modal for deleting team
    $('#btn_yes').on('click', () => {
      var val = $('#btn_yes').attr('value');
      var split_val = val.split(','),
        team_id = split_val[1];
      console.log(team_id);
      this.emergencyservice.global_service('1','/del_team_status','team_id='+team_id).subscribe(data=>{
        console.log(data);
      })
      
    })
  }
  fetchdata(){
    this.emergencyservice.global_service('0','/team_status_dash',"null").subscribe(data=>{
      console.log(data);
       this.get_team_status=data;
       this.get_team_status=this.get_team_status.msg;
       this.putdata(this.get_team_status);
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

modify_modal(team_id:any){
  $('#btn_yes').attr('value', '1,'+team_id+'');
  $('#btn_no').attr('value', '0,'+team_id+'');
}

del_team(flag:any, team_id:any) {
  if(flag > 0){
    console.log(team_id);
    // alert(team_id);
    //Del query
  }else{
    console.log(flag)
    // alert(flag)
    //close the modal
  }
}
}
