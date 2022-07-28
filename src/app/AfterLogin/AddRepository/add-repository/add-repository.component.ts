
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-repository',
  templateUrl: './add-repository.component.html',
  styleUrls: ['./add-repository.component.css']
})
export class AddRepositoryComponent implements OnInit {
  p: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['icon','Name', 'Date', 'Type', 'Created_by'];
  dataSource= new MatTableDataSource();
  // getFiles:any=[];
  headername:any='Form & Checklist';
  icon:any='fa-list-ul';
  view_type='G';
  get_category:any=[];
  // sort_folder:any=[];
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.fetchData();

  }
  fetchData(){
    this.emergencyservice.global_service('0','/repository_category',null).subscribe(data=>{
      this.get_category=data;
      this.get_category=this.get_category.msg;
      this.putfiles(this.get_category);
       this.spinner.hide();
      })
  }
   putfiles(v:any){
    this.dataSource=new MatTableDataSource(v);
    setTimeout(()=>{
      this.dataSource.paginator = this.paginator;
    },300)
   }
   //For Changing List Or Grid View
  change_view(view_type:any){
       this.view_type=view_type;
    }
    //For sorting
    sorting(sort_value:any)
    {
      var flag=sort_value!='' ? sort_value : null;
      this.spinner.show();
      this.emergencyservice.global_service('0','/repository_category','flag='+flag).subscribe(data=>{
      this.get_category.length=0;
        this.get_category=data;
        this.get_category=this.get_category.msg;
        // this.dataSource=new MatTableDataSource(this.get_category);
        this.putfiles(this.get_category);
        this.spinner.hide();
        })
    }

}
