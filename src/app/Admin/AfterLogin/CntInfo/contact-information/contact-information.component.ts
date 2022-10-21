import { Router } from '@angular/router';

import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {
  constructor(private router: Router){}

  ngOnInit(): void {
  }

  routeToMediaModification(id: any){
   this.router.navigate(['/admin/cntinfo',btoa(id)])
  }


}
