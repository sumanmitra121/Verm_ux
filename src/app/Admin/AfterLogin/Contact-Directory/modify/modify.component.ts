import { VirtualEmergencyService } from './../../../../Services/virtual-emergency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
  contact_cat!: FormGroup;
  id = Number(atob(this.actRT.snapshot.params.id));
  constructor(
    private actRT: ActivatedRoute,
    private api_call: VirtualEmergencyService,
    private router: Router
  ) {
    console.log(Number(atob(this.actRT.snapshot.params.id)))
      this.setForm('', localStorage.getItem('Email'));
  }

  ngOnInit(): void {

    if (Number(atob(this.actRT.snapshot.params.id)) > 0) {
      this.api_call
        .global_service(
          0,
          '/contact_catg',
          'id=' + Number(atob(this.actRT.snapshot.params.id))
        )
        .pipe(map((x: any) => x.msg))
        .subscribe((res) => {
          console.log(res);
          this.bindDt(res[0].catg_name,res[0].id);
        });
    }
  }
  setForm(catg_name: any, user: any) {
    this.contact_cat = new FormGroup({
      id: new FormControl(Number(atob(this.actRT.snapshot.params.id))),
      catg_name: new FormControl(catg_name, [Validators.required]),
      user: new FormControl(user),
    });
  }
  submitContact() {
    this.api_call
      .global_service(1, '/contact_catg', this.contact_cat.value)
      .subscribe((res: any) => {
        this.api_call.showToast(res.msg,res.suc > 0 ? 'S' : 'E')
        this.router.navigate(['/admin/cntcat']);
      });
  }
  bindDt(catg_name:any,id:any){
 this.contact_cat.setValue({
  id:id,
  catg_name:catg_name,
  user:localStorage.getItem('Email')
 })
  }
}
