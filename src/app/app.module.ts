import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  RegisterFormComponent
} from './pages/register-form/register-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AuthGuard } from './guards/auth-guard';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
const appRoutes: Routes = [
  {path: 'register', component: RegisterFormComponent},
  {path: 'admin/login', component: LoginPageComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: AdminHomePageComponent} 
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavbarComponent,
    CreateFormComponent,
    LoginPageComponent,
    AdminNavComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
