import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpHeaderOptions: any;
  constructor(private http: HttpClient) { 
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('loggedinToken')
      })
    }
  }
  readCategories(): Observable<any>{
    return this.http.get(environment.apiEndpoint + 'read.php?module_type=categories');
  }
  readCategoryById(id:number): Observable<any>{
    return this.http.get(environment.apiEndpoint +'read.php?module_type=categories&module_type_id='+id);   
  }
}
