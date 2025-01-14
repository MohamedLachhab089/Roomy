import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder,
              private loginService: AuthService,
              private message: NzMessageService,
              private router: Router,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  SubmitLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.message.success("Login successfully!", {nzDuration: 5000});
        this.router.navigate(['dashboard']);
      }, error: (error) => {
        this.message.error("Login failed!", {nzDuration: 5000});
      }
    })
  }


}
