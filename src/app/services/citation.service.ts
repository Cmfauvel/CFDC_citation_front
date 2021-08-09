import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Citation } from '../_models/citation';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  baseUrl = `${environment.apiUrl}/citation`;
  constructor(private http: HttpClient) { }

  selectAll(){
    return this.http.get<Citation>(this.baseUrl);
  }

  selectAllByUser(userId){
    return this.http.get<Citation>(this.baseUrl + '/' + userId);
  }

  selectOne(id){
    return this.http.get<Citation>(this.baseUrl + '/' + id);
  }

  selectOneRandom() {
    return this.http.get<Citation>(this.baseUrl + '/random/1');
  }

  update(id, newValues){
    return this.http.put<Citation>(this.baseUrl + '/' + id, newValues);
  }

  delete(id){
    return this.http.delete<Citation>(this.baseUrl + '/' + id);
  }

  create(userId, citation){
    return this.http.post<any>(this.baseUrl + '/' + userId, citation)
  }
}
