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

  selectAllByUser(){

  }

  selectOneRandom() {
    
  }

  update(id, newValues){
    return this.http.put<Citation>(this.baseUrl + '/' + id, newValues);
  }

  delete(id){
    return this.http.delete<Citation>(this.baseUrl + '/' + id);
  }

  create(citation){
    return this.http.post<any>(this.baseUrl + '/insert', citation)
  }
}
