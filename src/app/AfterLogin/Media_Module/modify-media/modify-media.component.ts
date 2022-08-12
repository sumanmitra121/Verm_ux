import { DatePipe } from '@angular/common';
import { VirtualEmergencyService } from './../../../Services/virtual-emergency.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modify-media',
  templateUrl: './modify-media.component.html',
  styleUrls: ['./modify-media.component.css']
})
export class ModifyMediaComponent implements OnInit {
  ROUTEPARAMS = {"id":0,"type":''};
  media_release!:FormGroup;
  constructor(private routeParams:ActivatedRoute,
    private fb:FormBuilder,
    private datePipe:DatePipe,
    private router:Router,
    private api_call:VirtualEmergencyService) {
    this.ROUTEPARAMS = {
      "id":Number(atob(this.routeParams.snapshot.params.id)),
      "type": atob(this.routeParams.snapshot.params.type)
    }
    if(atob(this.routeParams.snapshot.params.type) == 'M'){
      this.media_release = this.fb.group({
        id:[Number(atob(this.routeParams.snapshot.params.id))],
        inc_id:[''],
        user:[localStorage.getItem('Email')],
        rel_no:[''],
        date:[''],
        time:[''],
        contact_1:[''],
        contact_2:[''],
        location:['']
      })
    }
    else{
      //Holding Statement
    }
  }
  ngOnInit(): void {this.setmedia_Control();}
  setmedia_Control(){
    if(Number(atob(this.routeParams.snapshot.params.id)) > 0){
      var api_name = atob(this.routeParams.snapshot.params.type) == 'M' ? '/media_release' : 'holding_statement';
      this.api_call.global_service(0,api_name,'id='+Number(atob(this.routeParams.snapshot.params.id))).pipe((map((x:any) => x.msg))).subscribe(res =>{
        switch(atob(this.routeParams.snapshot.params.type)){
          case "M":this.media_release.patchValue({
                    id:Number(atob(this.routeParams.snapshot.params.id)),
                    inc_id:res[0].inc_id,
                    user:localStorage.getItem('Email'),
                    rel_no:res[0].rel_no ? res[0].rel_no : '',
                    date:res[0].date  ? this.datePipe.transform(res[0].date,'yyyy-MM-dd') : '',
                    time:res[0].time ? res[0].time : '',
                    contact_1:res[0].contact_1 ? res[0].contact_1 : '',
                    contact_2:res[0].contact_2 ? res[0].contact_2 : '',
                    location:res[0].location ? res[0].location : ''
                    });
                    break;
          case "H":break;
          default:break;
        }
      })
     }
  }
  getIncDetails(event:any){
    if(Number(atob(this.routeParams.snapshot.params.id)) == 0){
      this.media_release.patchValue({
        inc_id:event.id
      })
    }
  }
  submit(mode:any){
   console.log(this.media_release);
   this.router.navigate(['/media'])
  }

}
