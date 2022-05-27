import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Invite } from './invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  // Local
  private baseURL = "http://localhost:5000/api/v1/invites";
  // private baseURL = "https://mariage-test.herokuapp.com/api/v1/invites";

  constructor(private httpClient: HttpClient) { }

  getInvitesList(): Observable<Invite[]>{
    return this.httpClient.get<Invite[]>(`${this.baseURL}`);
  }

  getInviteById(id: number): Observable<Invite>{
    return this.httpClient.get<Invite>(`${this.baseURL}/${id}`);
  }

  getInvitesListByIdFamille(id: number): Observable<Invite[]>{
    return this.httpClient.get<Invite[]>(`${this.baseURL}/famille/${id}`);
  }

  updateInvite(id: number, invite: Invite): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, invite);
  }

  deleteInvite(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
