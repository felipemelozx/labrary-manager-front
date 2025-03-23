import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginDTO } from '../../interface/loginDTO';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interface/LoginResponse';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginDto: loginDTO = {
    email: '',
    password: ''
  };

  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Injetando o Router para redirecionamento
  ) {}
  ngOnInit(): void {
    // Verifica se o token está presente no localStorage
    if (localStorage.getItem('authToken')) {
      
      // Se o token existir, redireciona automaticamente para a home
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.loginDto.email.trim() || !this.loginDto.password.trim()) {
      this.error = 'Todos os campos são obrigatórios!';
      return;
    }

    if (!emailRegex.test(this.loginDto.email.trim())) {
      this.error = 'Digite um e-mail válido!';
      return;
    }

    if (this.loginDto.password.trim().length < 8) {
      this.error = 'A senha deve ter pelo menos 8 caracteres!';
      return;
    }

    console.log('Login realizado com:', this.loginDto);
    this.error = '';

    this.authService.login(this.loginDto).subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('authToken', response.token);

        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = 'Credenciais inválidas. Tente novamente!';
        console.error('Erro de login:', error);
      }
    );
  }
}
