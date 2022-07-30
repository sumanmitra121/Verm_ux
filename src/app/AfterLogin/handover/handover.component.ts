import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-handover',
  templateUrl: './handover.component.html',
  styleUrls: ['./handover.component.css']
})
export class HandoverComponent implements OnInit {
  handoverform!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.handoverform = this.fb.group({
      header:['',Validators.required],
      comment:['',Validators.required]
    })
  }
  HandOver(){
    console.log(this.handoverform.value)
  }
}
