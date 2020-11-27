import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { CountryListComponent } from './components/country-list.component';
import { ApiSettingComponent } from './components/api-setting.component';
import { NewsComponent } from './components/news.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field'
import { NewsDatabase } from './news.database';

//configure routes
const ROUTES: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'countryList', component: CountryListComponent },
  { path: 'apisetting', component: ApiSettingComponent },
  { path: 'news/:country', component: NewsComponent },
  { path: "**", redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    ApiSettingComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,
    MatToolbarModule, MatFormFieldModule, HttpClientModule
  ],
  providers: [ NewsDatabase ],
  bootstrap: [AppComponent]
})
export class AppModule { }
