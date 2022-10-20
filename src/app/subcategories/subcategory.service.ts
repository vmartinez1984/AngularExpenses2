import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubcategoryDto } from './subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  update(subcategory: SubcategoryDto):Observable<any> {
    return this.httpClient.put(this.url +"/"+ subcategory.id, subcategory)
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id)
  }
  add(subcategory: SubcategoryDto): Observable<any> {
    return this.httpClient.post(this.url, subcategory)
  }
  url = environment.baseUrl + "/api/subcategories";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  getById(subcategoryId: string): Observable<any> {
    return this.httpClient.get(this.url+"/"+ subcategoryId)
  }
}
