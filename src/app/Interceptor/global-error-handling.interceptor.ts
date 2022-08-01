import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class GlobalErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private spinner:NgxSpinnerService,private toastr:ToastrManager) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
             this.spinner.hide();
             this.toastr.errorToastr('Server Not Respond','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        }
        return throwError(error);
      })
    )
  }
}
