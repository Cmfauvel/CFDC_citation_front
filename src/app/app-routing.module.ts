import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { EditCitationComponent } from './list-citations/edit-citation/edit-citation.component';
import { ListCitationsComponent } from './list-citations/list-citations.component';
import { UploadCitationComponent } from './list-citations/upload-citation/upload-citation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'citations', canActivate:[AuthGuard], component: ListCitationsComponent },
  { path: 'citations/:id', canActivate:[AuthGuard], component: EditCitationComponent },
  { path: 'create', component: UploadCitationComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }