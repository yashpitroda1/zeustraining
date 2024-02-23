import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkinComponent } from './view/walkin/walkin.component';
import { SuccessfullyAppliedComponent } from './view/walkin/walkin-details/successfully-applied/successfully-applied.component';
import { WalkinItemComponent } from './view/walkin/walkin-list/walkin-item/walkin-item.component';
import { WalkinListComponent } from './view/walkin/walkin-list/walkin-list.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { WalkinDetailsComponent } from './view/walkin/walkin-details/walkin-details.component';
import { AuthGuard } from './services/auth-guard.service';
import { ApplyInWalkinComponent } from './view/walkin/walkin-details/apply-in-walkin/apply-in-walkin.component';

const routes: Routes = [
  { path: "", redirectTo: "/walkin", pathMatch: 'full' },
  {
    path: "walkin", component: WalkinComponent,

    children: [
      { path: '', component: WalkinListComponent, },
      {
        path: ':id/:walkinName', component: WalkinDetailsComponent, canActivate: [AuthGuard], children: [
          { path: '', component: ApplyInWalkinComponent, },
          { path: 'successfullyapplied', component: SuccessfullyAppliedComponent, },
        ]
      },
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
