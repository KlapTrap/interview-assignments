import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { QuillModule } from 'ngx-quill';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { routes } from './app/app-routing';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { provideRouter } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ReactiveFormsModule,
      NzSpinModule,
      NzIconModule.forRoot([]),
      environment.production ? [] : AkitaNgDevtools,
      AkitaNgRouterStoreModule,
      QuillModule.forRoot()
    ),
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
