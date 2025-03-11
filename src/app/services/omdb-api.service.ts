import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { IOMDBResponse } from '../omdbresponse';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  private _siteURL="https://www.omdbapi.com/"
  private _key="?apikey=2bcb2f9d&t="

  constructor(private _http:HttpClient) { }

  getMovieData(movieName:string):Observable<IOMDBResponse>
  {
    return this._http.get<IOMDBResponse>(this._siteURL+ this._key + movieName)
    .pipe(
      tap(data=> console.log('Moviedata/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }
  private handleError(err:HttpErrorResponse)
  {
    console.log('OmdbApiService:' + err.message)
    //previous Version return throwError("error:"+err.message);
    return throwError(()=> new Error("OmdbApiService:" + err.message))
  }


}
