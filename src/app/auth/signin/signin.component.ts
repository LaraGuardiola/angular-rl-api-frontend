import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('load', this.resize)
    window.addEventListener('resize', this.resize)
  }

  //sets up the size to the exact 100% for mobile!
  resize() {
    let vh = window.innerHeight * 0.01;
    let form = document.querySelector('.centered')
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.body.style.setProperty('height', `${(vh * 100)}px`);
    (form as HTMLElement).style.setProperty('height', `${(vh * 100)}px`);
    console.log(vh * 100)
  }

  onSubmit(){
    if (this.authForm.invalid) {
      return;
    }

    //some RxJS authService call

    this.authService.signIn(this.authForm.value).subscribe({
      next: response => {
        console.log(this)
        const { token } = response
        sessionStorage.setItem('jwt', token);
        console.log(sessionStorage.getItem('jwt'))
      },

      //this way they can see the error message if you want to display it from any template
      error: error => {
        if(!error.status){
          this.authForm.setErrors({ noConnection: true })
        }else{
          this.authForm.setErrors({ unknownError: true })
        }
      },
      complete: () => {
        console.log('complete')
        this.router.navigate(['matches'])
      }
    })
  }

}
