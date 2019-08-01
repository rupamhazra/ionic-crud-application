import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(
    private http: HttpClient
  ) { }
  registerService(data:any): Observable<any>{
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'login_and_register.php/?action=register', data)
  }
  loginService(data:any): Observable<any>{
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'login_and_register.php/?action=login', data)
  }
}
