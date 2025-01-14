import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid() {
    return !this.token;
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }

    //decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  private decodeToken(): any {
    const token = this.token;
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    try {
      return jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Error through decoding the token:', error);
      return null;
    }
  }

  getRole(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.role : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isCustomer(): boolean {
    return this.getRole() === 'CUSTOMER';
  }
}
