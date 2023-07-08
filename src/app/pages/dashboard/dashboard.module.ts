import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { sessionParamsFeatureKey } from './state/session-params/session-params-feature-key';
import { sessionParamsReducer } from './state/session-params/session-params.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SessionParamsEffect } from './state/session-params/session-params.effect';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature(sessionParamsFeatureKey, sessionParamsReducer),
    EffectsModule.forFeature([SessionParamsEffect]),
  ],
})
export class DashboardModule {}
