import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./components/register/register.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule, HttpClientModule, RegisterComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'labrary-manager-front';

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  token: string | null = ''
  isLoggedIn:boolean = false;
  ngOnInit(): void {
    this.token = localStorage.getItem('authToken')
    if (this.token) {
      this.isLoggedIn = true;
      this.cdr.detectChanges();
    }else {
      this.isLoggedIn = false;
    }
  }
}
