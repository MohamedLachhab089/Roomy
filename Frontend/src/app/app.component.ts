import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "./auth/services/token/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  isCollapsed = false;

  constructor(private router: Router, private tokenService: TokenService) {
  }

  /*isAdminLoggedIn(): boolean {
    return this.tokenService.isAdmin();
  }

  isCustomerLoggedIn(): boolean {
    return this.tokenService.isCustomer();
  }

  isLoggedIn(): boolean {
    return !this.tokenService.isTokenNotValid();
  }*/

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
