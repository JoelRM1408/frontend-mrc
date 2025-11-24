import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { HomeSidebarComponent } from './modules/home-sidebar/home-sidebar/home-sidebar.component';

export const routes: Routes = [
  // {
  //   path: '', redirectTo: 'auth', pathMatch: 'full'
  // },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'home',
    component: HomeSidebarComponent,
    loadChildren: () =>
      import('./modules/home-sidebar/home-sidebar.routes')
        .then(m => m.HOME_SIDEBAR_ROUTES)
  },
  {
    path: '**', redirectTo: 'auth'
  }
];
