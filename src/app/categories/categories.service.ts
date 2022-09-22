import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  getSubcategoriesByCategoryId(categoryId: string): Observable<any>{
    return this.httpClient.get(this.baseUrl + "/" + categoryId + "/Subcategories")
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/" + id)
  }
  update(id: any, categoryDtoIn: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/" + id, categoryDtoIn)
  }
  add(categoryDtoIn: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, categoryDtoIn)
  }

  baseUrl = environment.baseUrl + '/Api/Categories';

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(this.baseUrl)
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/" + id)
  }
}
