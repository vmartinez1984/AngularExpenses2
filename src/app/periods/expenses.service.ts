import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpenseDto } from './expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  update(expense: ExpenseDto): Observable<any> {
    return this.httpClient.put(this.url + expense.id, expense)
  }
  delete(expenseId: string): Observable<any> {
    return this.httpClient.delete(this.url + expenseId)
  }
  url = environment.baseUrl + '/Api/Expenses/'

  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<any> {
    return this.httpClient.get(this.url + id);
  }

  add(expense: ExpenseDto): Observable<any> {
    return this.httpClient.post(this.url, expense)
  }
}
