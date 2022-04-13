import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Invite } from './invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private baseURL = "http://localhost:8080/api/v1/invites";

  constructor(private httpClient: HttpClient) { }

  getInvitesList(): Observable<Invite[]>{
    return this.httpClient.get<Invite[]>(`${this.baseURL}`);
  }

  getInviteById(id: number): Observable<Invite>{
    return this.httpClient.get<Invite>(`${this.baseURL}/${id}`);
  }

  updateInvite(id: number, invite: Invite): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, invite);
  }
}
