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
import { TeButtonComponent } from '@shared/components/te-button/te-button.component';
import { IfPermittedForDirective } from '@shared/directives/if-permitted-for/if-permitted-for.directive';
import { TeIconComponent } from '@shared/components/te-icon/te-icon.component';
import { MenuGroupComponent } from '@pages/dashboard/components/menu/menu-group/menu-group.component';
import { MenuHeaderComponent } from '@pages/dashboard/components/menu/menu-header/menu-header.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MenuHeaderComponent,
    MenuGroupComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature(sessionParamsFeatureKey, sessionParamsReducer),
    EffectsModule.forFeature([SessionParamsEffect]),
    TeButtonComponent,
    IfPermittedForDirective,
    TeIconComponent,
  ],
})
export class DashboardModule {}
