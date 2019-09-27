import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  
  httpHeaderOptions: any;
  constructor(private http: HttpClient) { 
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'key=AIzaSyBKlkRtqjiJ9fEu2W7Y9zJNQ0DvKu2UbMc'
      })
    }
  }

  sendMessage(data:any): Observable<any>{
    console.log('data',data)
    return this.http.post(environment.fcmEndpoint +'send', data,this.httpHeaderOptions);
  }
  addDeviceDetailsWithDeviceToken(data:any): Observable<any>{
    console.log('data',data)
    return this.http.post(environment.apiEndpoint +'firebase.php', data);
  }
  addDemoData(data:any): Observable<any>{
    console.log('data',data)
    return this.http.post(environment.apiEndpoint +'firebase.php', data);
  }
}
