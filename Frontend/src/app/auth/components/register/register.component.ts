import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private signupService: AuthService,
              private message: NzMessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  SubmitSignup() {
    this.signupService.register(this.registerForm.value).subscribe(res => {
      if (res.id != null) {
        this.message.success("Signup successfully!", {nzDuration: 5000});
        this.router.navigate(['/']);
      } else {
        this.message.error(res.message, {nzDuration: 5000});
      }
    })
  }

}
