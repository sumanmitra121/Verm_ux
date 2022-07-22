export class validations{


//For Prevent Non Numeric input
  static _preventnonNumeric(e:any){
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }
  //For Prevent Non Number input
  static _preventNumber(e:any){
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
     }
  }

}
