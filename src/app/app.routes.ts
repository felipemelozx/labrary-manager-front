import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { EmprestimoComponent } from './components/emprestimo/emprestimo.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [AuthGuard] },
  { path: 'emprestimos', component: EmprestimoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }  // Rota wildcard para redirecionar qualquer outra URL não definida
];
