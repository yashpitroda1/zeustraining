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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { WalkinComponent } from './walkin/walkin.component';
import { WalkinItemComponent } from './walkin/walkin-list/walkin-item/walkin-item.component';
import { WalkinServices } from './services/walkin.services';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { SuccessfullyAppliedComponent } from './walkin/successfully-applied/successfully-applied.component';
import { WalkinListComponent } from './walkin/walkin-list/walkin-list.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { WalkinDetailsComponent } from './walkin/walkin-details/walkin-details.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { TitleCardComponent } from './walkin/walkin-details/title-card/title-card.component';
import { TimeslotPreferancesCardComponent } from './walkin/walkin-details/timeslot-preferances-card/timeslot-preferances-card.component';
import { HttpClientModule } from '@angular/common/http';

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
    TitleCardComponent,
    TimeslotPreferancesCardComponent
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
    MatFormFieldModule,
    MatDividerModule, MatButtonModule, MatIconModule, MatBadgeModule, MatExpansionModule, MatRadioModule, MatCheckboxModule
  ],
  providers: [WalkinServices, AuthService, AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
