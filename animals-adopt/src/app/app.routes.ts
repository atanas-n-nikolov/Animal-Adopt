import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AdoptComponent } from './adopt/adopt.component';
import { LostFoundComponent } from './lost-found/lost-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'users/register', component: RegisterComponent},
  {path: 'users/login', component: LoginComponent},
  {path: 'animals/adopt', component: AdoptComponent},
  {path: 'animals/lost-and-found', component: LostFoundComponent}
];
