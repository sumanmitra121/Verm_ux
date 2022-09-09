import { Component} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css',
   '../../../assets/css/adminLTE_Errors.css']
})
export class PageNotFoundComponent {
  constructor(private _location:Location){}
  navigate(){this._location.back();}
}
