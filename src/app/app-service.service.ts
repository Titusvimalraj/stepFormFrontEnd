import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { GlobalConfig } from './globalConfig';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {


  private serverBaseUrl = `${GlobalConfig.serverUrl}/${GlobalConfig.apiVersion}/form`;



  constructor(private _http: HttpClient, private _router: Router, private activatedRoute: ActivatedRoute) {

  }

  public createForm = (formdata): Observable<any> => {
    let myResponse = this._http.post(`${this.serverBaseUrl}/create`, formdata).catch(this.handleError);
    return myResponse;
  }

  /**
   * @author Titus Vimal Raj
   * @description this is to handle http error repsonse
   * @param err 
   */
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}: (${err.error.message})`;
    } // end condition *if
    return Observable.throw(errorMessage);

  }  // END handleError


}
