import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TeLoaderComponent } from '@shared/components/te-loader/te-loader.component';
import { InternetConnectionErrorInterceptor } from '@shared/interceptors/internet-connection-error-interceptor';
import { RequestPayloadServicePropertiesCleanerInterceptor } from '@shared/interceptors/request-payload-service-properties-cleaner-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestDelayInterceptor } from '@shared/interceptors/request-delay-interceptor';
import { RequestBaseUrlInterceptor } from '@shared/interceptors/request-base-url-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    TeLoaderComponent,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InternetConnectionErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestPayloadServicePropertiesCleanerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestBaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestDelayInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
// TODO: Remove RequestDelayInterceptor
