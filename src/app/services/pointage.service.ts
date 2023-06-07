import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/pointage';
@Injectable({
  providedIn: 'root'
})
export class PointageService {
 
  constructor(private http: HttpClient) { }
  getPointages(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title:any): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
  calculerRetard(id: any): Observable<any> {
    
   
    const url = `${baseUrl}/${id}/retard`;
        return this.http.get(url);
      }
    
}
