import { Router } from '@angular/router';
import { VirtualEmergencyService } from './../../../Services/virtual-emergency.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { global_url_test } from 'src/app/url';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  _url= global_url_test.URL;

  incDetails:any={};
  flag:any = "M";
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[]=[];

  constructor(private api_call:VirtualEmergencyService,private route:Router) {this.setColumn();}
  ngOnInit(): void {}
  fetchData(inc_id:any){
    console.log(inc_id);

     let api_name = this.flag == 'M' ? '/media_rel' :'/'
     this.api_call.global_service(0,api_name,'inc_id='+inc_id).pipe(map((x:any) => x.msg)).subscribe(res =>{
      this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
     })
  }
  getIncDetails(event:any){
    this.incDetails = event;
    this.fetchData(event.id);
  }
  checkMediaType(event:any){
      this.flag = event.value;
      this.setColumn();
      this.fetchData(this.incDetails.id);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  setColumn(){
    this.displayedColumns = this.flag == 'M' ? ['id','Release No','Date','Action'] : ['id','Contactors Name','incident','Date','Action'];
    this.dataSource = new MatTableDataSource();
  }
  routeToMediaModification(_id:any){
     this.route.navigate(['/media',btoa(this.flag),btoa(_id)]);
  }
}
