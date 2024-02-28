import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { WalkinServices } from './services/walkin.services';
import { WalkinApiService } from './apis/walkin-api.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';


import { AppComponent } from './app.component';
import { HeaderComponent } from './view/header/header.component';
import { WalkinComponent } from './view/walkin/walkin.component';
import { WalkinItemComponent } from './view/walkin/walkin-list/walkin-item/walkin-item.component';
import { SuccessfullyAppliedComponent } from './view/walkin/walkin-details/successfully-applied/successfully-applied.component';
import { WalkinListComponent } from './view/walkin/walkin-list/walkin-list.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { WalkinDetailsComponent } from './view/walkin/walkin-details/walkin-details.component';
import { ApplyInWalkinComponent } from './view/walkin/walkin-details/apply-in-walkin/apply-in-walkin.component';
import { RegistrationPageComponent } from './view/registration-page/registration-page.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';


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
    RegistrationPageComponent,
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
    MatFormFieldModule, MatProgressSpinnerModule, MatProgressBarModule, MatStepperModule, MatSelectModule, MatOptionModule,
    MatDividerModule, MatButtonModule, MatIconModule, MatBadgeModule, MatExpansionModule, MatRadioModule, MatCheckboxModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  providers: [
    WalkinServices, WalkinApiService, AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    MatNativeDateModule, MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
