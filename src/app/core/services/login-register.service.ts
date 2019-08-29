import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../../environments/environment';
import { NetworkService } from './../../core/services/network.service';
@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) { }
  registerService(data:any): Observable<any>{
    console.log(data);
    if (!this.networkService.checkNetworkDisconnect())
        return this.http.post(environment.apiEndpoint + 'login_and_register.php/?action=register', data)
  }
  loginService(data:any): Observable<any>{
    console.log(data);
    if (!this.networkService.checkNetworkDisconnect())
      return this.http.post(environment.apiEndpoint + 'login_and_register.php/?action=login', data)
  }
}
