import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, createPlatform, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  login(){
    this.loginService.login(this.formLogin.value).subscribe((result: any)=>{
      localStorage.setItem('token', result.access_token);
      console.log(result.access_token);
      this.formLogin.reset();
      this.router.navigate(['/usuarios'])
    },err=>{
      console.log(err);
      this.formLogin.reset();
    })
  }

}
