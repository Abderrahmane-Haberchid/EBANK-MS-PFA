import { APP_INITIALIZER, ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideEcharts } from 'ngx-echarts';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthConfig, provideOAuthClient, OAuthService } from 'angular-oauth2-oidc';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ebank-pfa',
  tokenEndpoint: 'http://localhost:8080/realms/ebank-pfa/protocol/openid-connect/token',
  redirectUri: 'http://localhost:4200/home',
  clientId: 'bank-ms-client',
  responseType: 'code',
  scope: 'openid profile',
  requireHttps: false
}

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
    .then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideEcharts(),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    provideOAuthClient(),

    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    }
  ]
};

