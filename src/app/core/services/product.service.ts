import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeaderOptions: any;
  constructor(private http: HttpClient) { 
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('loggedinToken')
      })
    }
  }
  readProducts(): Observable<any>{
    return this.http.get(environment.apiEndpoint + 'read.php?module_type=products');
  }
  createProduct(data:any): Observable<any>{
    return this.http.post(environment.apiEndpoint +'create.php', data);
  }
  getProduct(id:number): Observable<any>{
    return this.http.get(environment.apiEndpoint +'read.php?module_type=product&module_type_id='+id);   
  }
  updateProductService(id:number, data: any): Observable<any>{
    console.log('data',data)
    return this.http.put(environment.apiEndpoint +'update.php?id='+id, data);   
  }
  deleteProduct(id: number,data:any): Observable<any>{
    return this.http.put(environment.apiEndpoint +'delete.php/?id='+id,data);
  }
  uploadFormData(formData) : Observable<any>{
    return this.http.post(environment.apiEndpoint + 'create.php', formData);
  }
}
