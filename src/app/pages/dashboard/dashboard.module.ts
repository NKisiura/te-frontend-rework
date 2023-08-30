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
import { cpOptionsFeatureKey } from '@pages/dashboard/state/cp-options/cp-options-feature-key';
import { cpOptionsReducer } from '@pages/dashboard/state/cp-options/cp-options.reducer';
import { CpOptionsEffect } from '@pages/dashboard/state/cp-options/cp-options.effect';
import { SessionParamsService } from '@shared/services/http/session-params.service';
import { CpOptionsService } from '@shared/services/http/cp-options.service';

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
    StoreModule.forFeature(cpOptionsFeatureKey, cpOptionsReducer),
    EffectsModule.forFeature([SessionParamsEffect, CpOptionsEffect]),
    TeButtonComponent,
    IfPermittedForDirective,
    TeIconComponent,
  ],
  providers: [SessionParamsService, CpOptionsService],
})
export class DashboardModule {}
