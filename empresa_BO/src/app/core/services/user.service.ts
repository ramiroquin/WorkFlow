import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreateModel, UserModel, UserUpdateModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44389/api'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/User`);
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/User/${id}`);
  }

  createUser(user: UserCreateModel): Observable<UserCreateModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserCreateModel>(`${this.apiUrl}/User`, user, { headers });
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/User/${id}`);
  }

  updateUser(user: UserUpdateModel): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.apiUrl}/User`, user, { headers });
  }
}
