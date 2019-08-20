import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  httpHeaderOptions: any;
  constructor(private http: HttpClient) { 
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('loggedinToken')
      })
    }
  }
  readSliders(): Observable<any>{
    return this.http.get(environment.apiEndpoint + 'read.php?module_type=sliders');
  }
}
