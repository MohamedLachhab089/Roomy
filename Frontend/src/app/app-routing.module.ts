import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./auth/components/register/register.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {DashboardComponent} from "./auth/components/dashboard/dashboard.component";
import {authGuard} from "./auth/services/guard/auth.guard";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: '**', redirectTo: ''},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [authGuard], data: {role: 'ADMIN'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
