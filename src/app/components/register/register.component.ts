import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../../interface/LoginResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterDTO } from '../../interface/registerDTO';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, HttpClientModule,RouterModule],
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) {}

  registerDTO: RegisterDTO = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  };

  errorMessages = {
    email: '',
    password: '',
    erroRegisterUser: '',
  };
  emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;

  ngOnInit(): void {
    // Verifica se o token está presente no localStorage
    if (localStorage.getItem('authToken')) {
      // Se o token existir, redireciona automaticamente para a home
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (!this.validateEmail()) {
      console.log('passei aqui email...');
      return;
    }
    if (this.validatePassword()) {
      console.log('passei aqui password...');
      return;
    }
    console.log('Registrando usuário...', this.registerDTO);
    this.authService.register(this.registerDTO).subscribe(
      (response: LoginResponse) => {
        console.log('Usuário registrado com sucesso!', response);
      },
      (error) => {
        this.errorMessages.erroRegisterUser = 'Erro ao registrar usuário.';
        console.error(error);
      }
    );

  }
  validateEmail(): boolean {
    const isValid = this.emailRegex.test(this.registerDTO.email);
    this.errorMessages.email = isValid ? '' : 'Email inválido!';
    return isValid;
  }

  validatePassword(): boolean {
    const isValid = this.passwordRegex.test(this.registerDTO.password);
    this.errorMessages.password = isValid
      ? ''
      : 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial!';
    return isValid;
  }
}
