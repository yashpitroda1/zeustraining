import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkinComponent } from './walkin/walkin.component';
import { SuccessfullyAppliedComponent } from './walkin/successfully-applied/successfully-applied.component';
import { WalkinItemComponent } from './walkin/walkin-list/walkin-item/walkin-item.component';
import { WalkinListComponent } from './walkin/walkin-list/walkin-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { WalkinDetailsComponent } from './walkin/walkin-details/walkin-details.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "/walkin", pathMatch: 'full' },
  {
    path: "walkin", component: WalkinComponent,

    children: [
      { path: '', component: WalkinListComponent, },
      { path: 'successfullyapplied', component: SuccessfullyAppliedComponent, canActivate: [AuthGuard], },
      { path: ':id/:walkinName', component: WalkinDetailsComponent, canActivate: [AuthGuard], },
    ]
  },
  {
    path: "login", component: LoginPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
