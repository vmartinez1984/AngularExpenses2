import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeriodDto } from './period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  getEntries(periodId: string):Observable<any> {
    return this.httpClient.get(this.url + "/" + periodId + "/Entries")
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(this.url + "/" + id)
  }

  url = environment.baseUrl + "/Api/Periods";

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  getExpenses(periodId: string): Observable<any> {
    return this.httpClient.get(this.url + "/" + periodId + "/Expenses")
  }
}
