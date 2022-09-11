

/* *** ts Page of before-login-dashboard component (http://localhost:4200/#/).*/


import { Component } from '@angular/core';

/* Decorator that determines how the  before-login-dashboard component should be processed, instantiated, and used at runtime.*/
@Component({
  /*
   *** Selector is used to identify the before-login-dashboard component in the HTML DOM tree once it is rendered into the browser.
   *** If we want to render this component into some other components then we have to use this selector name into those components
   *** in which we want to use them.
   *** Syntax: <app-before-login-dashboard></app-before-login-dashboard>
   */
  selector: 'app-before-login-dashboard',

  /***************************************************End*************************************************************************/

   /*
   *** templateUrl is The relative path or absolute URL of a template file (Html) for an before-login-dashboard component.
   */
  templateUrl: './before-login-dashboard.component.html',

  /***************************************************End*************************************************************************/

   /*
   *** styleUrls is The relative path or absolute URL of a template file (css) for an before-login-dashboard component.
   */
  styleUrls: ['./before-login-dashboard.component.css']

  /***************************************************End*************************************************************************/

})
/*                         ***************************************** End *****************************************           */

export class BeforeLoginDashboardComponent{constructor() { }}
