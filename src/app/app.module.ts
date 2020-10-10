import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ToastModule} from './toast/toast.module';
import {TabOneComponent} from './tab-one/tab-one.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UiComponentsModule} from './ui-components/ui-components.module';
import {ApiService, APP_CONFIG_TOKEN, AppConfig, UiComponentModule, UtilsService} from 'mobile-money';
import {DirectivesModule} from './directives/directives.module';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, TabOneComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ToastModule, HttpClientModule,
    StoreModule.forRoot({}), EffectsModule.forRoot(), FormsModule,
    ReactiveFormsModule, UiComponentsModule, UiComponentModule, DirectivesModule,
    ToastModule.forRoot()
  ],
  providers: [ApiService, { provide: APP_CONFIG_TOKEN, useClass: AppConfig },
  UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
