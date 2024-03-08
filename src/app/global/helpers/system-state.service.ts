import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SystemStateService {
  constructor() {}

  private _loggedIn = false;
  set loggedIn(login: boolean) {
    this._loggedIn = login;
    sessionStorage.setItem('loggedIn', String(login));
  }

  get loggedIn() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      return true;
    } else {
      return false;
    }
  }

  private _Token: string;
  set Token(token: string) {
    this._Token = token;
    sessionStorage.setItem('Token', String(token));
  }

  get Token() {
    var token = sessionStorage.getItem('Token');
    if (token) {
      return token;
    }
    return this._Token;
  }
}
