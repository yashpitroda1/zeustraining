import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './view/header/header.component';
import { WalkinComponent } from './view/walkin/walkin.component';
import { WalkinItemComponent } from './view/walkin/walkin-list/walkin-item/walkin-item.component';
import { WalkinServices } from './services/walkin.services';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { SuccessfullyAppliedComponent } from './view/walkin/walkin-details/successfully-applied/successfully-applied.component';
import { WalkinListComponent } from './view/walkin/walkin-list/walkin-list.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { WalkinDetailsComponent } from './view/walkin/walkin-details/walkin-details.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WalkinApiService } from './apis/walkin-api.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ApplyInWalkinComponent } from './view/walkin/walkin-details/apply-in-walkin/apply-in-walkin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    WalkinComponent,
    WalkinItemComponent,
    SuccessfullyAppliedComponent,
    WalkinListComponent,
    WalkinDetailsComponent,
    ApplyInWalkinComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatDividerModule, MatButtonModule, MatIconModule, MatBadgeModule, MatExpansionModule, MatRadioModule, MatCheckboxModule
  ],
  providers: [
    WalkinServices, WalkinApiService, AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
