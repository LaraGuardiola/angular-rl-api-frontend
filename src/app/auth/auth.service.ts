import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from './interfaces/token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'https://rl-api-match-tracker.herokuapp.com/api/auth/signin'

  constructor(private http: HttpClient) { }

  signIn(user: Token){
    return this.http.post<Token>(this.baseURL, user,{
      headers: {
        Accept: 'application/json'
      }
    })
  }
}
