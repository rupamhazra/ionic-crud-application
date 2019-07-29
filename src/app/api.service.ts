import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpHeaderOptions: any;
  constructor(private http: HttpClient) { 
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('loggedinToken')
      })
    }
  }

  registerService(data:any): Observable<any>{
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'login_and_register.php/?action=register', data)
  }
  loginService(data:any): Observable<any>{
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'login_and_register.php/?action=login', data)
  }
  readPolicies(): Observable<any>{
    return this.http.get(environment.apiEndpoint + 'read.php');
  }
  createPolicy(data:any): Observable<any>{
    return this.http.post(environment.apiEndpoint +'create.php', data);
  }
  getPolicy(id:number): Observable<any>{
    return this.http.get(environment.apiEndpoint +'read.php?id='+id);   
  }
  updatePolicy(data: any): Observable<any>{
    return this.http.put(environment.apiEndpoint +'update.php', data);   
  }
  deletePolicy(id: number,data:any): Observable<any>{
    return this.http.put(environment.apiEndpoint +'delete.php/?id='+id,data);
  }
}
