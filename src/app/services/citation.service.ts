import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Citation } from '../_models/citation';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  baseUrl = `${environment.apiUrl}`;
  private currentCitationsSubject: BehaviorSubject<Citation[]>;
  public currentCitations: Observable<Citation[]>;
  constructor(private http: HttpClient) { 
    this.currentCitationsSubject = new BehaviorSubject<Citation[]>(null);
    this.currentCitations = this.currentCitationsSubject.asObservable();
  }
  selectAllByUser(userId){
    console.log('call sub');
    
    this.http.get<Citation[]>(this.baseUrl + '/citations/' + userId).subscribe((resp) => {
      this.currentCitationsSubject.next(resp);
    })
  }

  selectOne(id){
    return this.http.get<Citation>(this.baseUrl + '/citation/' + id);
  }

  selectOneRandom() {
    return this.http.get<Citation>(this.baseUrl + '/random');
  }

  update(id, newValues){
    return this.http.put<Citation>(this.baseUrl + '/citation/' + id, newValues).subscribe((resp) => {
      this.selectAllByUser(newValues.userId)
    })
  }

  delete(id, userId){
    return this.http.delete<Citation>(this.baseUrl + '/citation/' + id, userId).subscribe((resp) => {
      this.selectAllByUser(userId)
    })
  }

  create(userId, citation){
    return this.http.post<any>(this.baseUrl + '/citation/' + userId, citation).subscribe((resp) => {
      console.log('Ajout citation');
      
      this.selectAllByUser(userId)
    })
  }
}
