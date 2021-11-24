import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchComponent } from './components/match/match.component';

import { ChartsModule } from "@rinminase/ng-charts";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    RegisterComponent,
    HomeComponent,
    TournamentsComponent,
    TeamsComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
