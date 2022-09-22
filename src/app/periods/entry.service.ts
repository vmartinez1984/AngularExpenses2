import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntryDto } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  add(entry: EntryDto): Observable<any> {
    return this.httpClient.post(this.url ,entry)
  }
  
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id)
  }
  
  constructor(private httpClient: HttpClient) { }
  
  url = environment.baseUrl + '/Api/Entries'
}
