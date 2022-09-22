import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  url = environment.baseUrl + "/api/subcategories";

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(this.url)
  }
}
