import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { sessionParamsReducer } from './state/session-params/session-params.reducer';
import { SessionParamsEffect } from './state/session-params/session-params.effect';
import { HttpClientModule } from '@angular/common/http';
import { sessionParamsFeatureKey } from './state/session-params/session-params-feature-key';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { [sessionParamsFeatureKey]: sessionParamsReducer },
      {}
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([SessionParamsEffect]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
