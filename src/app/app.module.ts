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
import { CandidateListPageComponent } from './pages/candidate-list-page/candidate-list-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDeleteFormComponent } from './components/confirm-delete-form/confirm-delete-form.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCandidatePageComponent } from './pages/edit-candidate-page/edit-candidate-page.component';
const appRoutes: Routes = [
  {path: 'register', component: RegisterFormComponent},
  {path: 'admin/login', component: LoginPageComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: AdminHomePageComponent},
      {path: 'candidates', component: CandidateListPageComponent},
      {path: 'candidates/:id', component: EditCandidatePageComponent}
    ]
  },
  {path: '**', component: RegisterFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavbarComponent,
    CreateFormComponent,
    LoginPageComponent,
    AdminNavComponent,
    AdminHomePageComponent,
    CandidateListPageComponent,
    ConfirmDeleteFormComponent,
    EditCandidatePageComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
