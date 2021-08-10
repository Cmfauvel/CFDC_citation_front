import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Citation } from '../_models/citation';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  selectAll(){
    return this.http.get<Citation>(this.baseUrl + '/citation');
  }

  selectAllByUser(userId){
    return this.http.get<Citation>(this.baseUrl + '/citation/' + userId);
  }

  selectOne(id){
    return this.http.get<Citation>(this.baseUrl + '/citation/' + id);
  }

  selectOneRandom() {
    return this.http.get<Citation>(this.baseUrl + '/random');
  }

  update(id, newValues){
    return this.http.put<Citation>(this.baseUrl + '/citation/' + id, newValues);
  }

  delete(id){
    return this.http.delete<Citation>(this.baseUrl + '/citation/' + id);
  }

  create(userId, citation){
    return this.http.post<any>(this.baseUrl + '/citation/' + userId, citation)
  }
}
