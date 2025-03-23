import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Suas rotas do lado do cliente
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Fornece o roteamento
    provideHttpClient(),     // Fornece o cliente HTTP
  ]
}).catch(err => console.error(err));
