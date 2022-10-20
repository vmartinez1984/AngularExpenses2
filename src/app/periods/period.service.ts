import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeriodDto } from './period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  update(period: PeriodDto): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url+"/"+id)
  }
  add(period: PeriodDto): Observable<any> {
    return this.httpClient.post(this.url, period)
  }
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
