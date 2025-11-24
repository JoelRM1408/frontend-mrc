import { Routes } from '@angular/router';

export const HOME_SIDEBAR_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'matricula',
       loadComponent: () =>
          import('./pages/matricula/matricula.component')
            .then(c => c.MatriculaComponent)
      },
      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./pages/estudiantes/estudiantes.component')
            .then(c => c.EstudiantesComponent)
      },
      {
        path: '**',
        redirectTo: 'matricula'
      }
    ]
  }
];
